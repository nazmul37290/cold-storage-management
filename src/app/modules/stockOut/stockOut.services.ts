import { StockInModel } from '../stockIn/stockIn.model';
import { TStockOut } from './stockOut.interface';
import { StockOutModel } from './stockOut.model';

const createStockOutIntoDB = async (data: TStockOut) => {
  // Calculate total amount if not provided
  if (!data.totalAmount) {
    data.totalAmount = data.bagsOut * data.rate;
  }

 const stockIn = await StockInModel.findOneAndUpdate(
      {
        srNo: data.srNo,
        availableBags: { $gte: data.bagsOut }, // ✅ ensure enough stock
      },
      {
        $inc: { availableBags: -data.bagsOut },
      },
      { new: true }
    );

  if(!stockIn){
    throw new Error('No matching Stock In record found for the provided sr no');
  }

  const result = await StockOutModel.create(data);
  return result;
};

const getAllStockOut = async () => {
  const result = await StockOutModel.find().sort({createdAt:-1});
  return result;
};

const getStockOutById = async (id: string) => {
  const result = await StockOutModel.findById( id );
  return result;
};

const getBookingDetailsBySrNo= async(srNo:string)=>{
   const stock = await StockInModel.findOne({ srNo }); 
   return stock;
}

const updateStockOutInDB = async (id: string, data: Partial<TStockOut>) => {
  const result = await StockOutModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

const deleteStockOutFromDB = async (id: string) => {
  const result = await StockOutModel.findByIdAndDelete( id );
  return result;
};

export const StockOutServices = {
  createStockOutIntoDB,
  getAllStockOut,
   getStockOutById,
  updateStockOutInDB,
  deleteStockOutFromDB,
  getBookingDetailsBySrNo
};
