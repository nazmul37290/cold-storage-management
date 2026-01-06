import { StockOutModel } from '../stockOut/stockOut.model';
import { TStockIn } from './stockIn.interface';
import { StockInModel } from './stockIn.model';

const createStockInIntoDB = async (data: TStockIn) => {
  const result = await StockInModel.create(data);
  return result;
};

const getAllStockIn = async () => {
  const result = await StockInModel.find();
  return result;
};

const getStockInById = async (id: string) => {
  const result = await StockInModel.findById( id );
  return result;
};

const updateStockInInDB = async (
  id: string,
  data: Partial<TStockIn>
) => {
  const stockIn = await StockInModel.findById(id);

  if (!stockIn) {
    throw new Error("Stock In not found");
  }

  /**
   * 🔁 CASE 1: bagsIn is being updated
   */
  if (typeof data.bagsIn === "number") {
    // 1️⃣ Calculate total bags already OUT
    const totalOutAgg = await StockOutModel.aggregate([
      { $match: { srNo: stockIn.srNo } },
      {
        $group: {
          _id: null,
          totalOut: { $sum: "$bagsOut" },
        },
      },
    ]);

    const totalBagsOut = totalOutAgg[0]?.totalOut || 0;

    // 2️⃣ Validation
    if (data.bagsIn < totalBagsOut) {
      throw new Error(
        `Bags IN cannot be less than already Stock OUT (${totalBagsOut})`
      );
    }

    // 3️⃣ Recalculate available bags
    stockIn.availableBags = data.bagsIn - totalBagsOut;
    stockIn.bagsIn = data.bagsIn;
  }

  /**
   * 🔁 CASE 2: other fields update only
   */
  if (typeof data.rate === "number") {
    stockIn.rate = data.rate;

    // Update totalAmount only if bagsIn exists
    stockIn.totalAmount =
      stockIn.bagsIn * data.rate;
  }

  if (data.date) {
    stockIn.date = data.date;
  }

  if (data.bookingNo) {
    stockIn.bookingNo = data.bookingNo;
  }

  if (data.customerName) {
    stockIn.customerName = data.customerName;
  }
  if (data.srNo) {
    stockIn.srNo = data.srNo;
  }

  await stockIn.save();

  return stockIn;
};


const deleteStockInFromDB = async (id: string) => {
  const result = await StockInModel.findByIdAndDelete( id );
  return result;
};

export const StockInServices = {
  createStockInIntoDB,
  getAllStockIn,
   getStockInById,
  updateStockInInDB,
  deleteStockInFromDB,
};
