import { StockInModel } from "./stockIn.model";
import { TStockIn } from "./stockIn.interface";

const createStockInIntoDB = async (payload: TStockIn) => {
  const result = await StockInModel.create({
    ...payload,
    date: new Date(payload.date), // safe conversion if date picker
  });

  return result.populate({
    path:'bookingId',
  });
};

const getAllStockIn = async () => {
  return await StockInModel.find()
    .populate({
    path:'bookingId',
  })
    .sort({ createdAt: -1 });
};

const getStockInById = async (id: string) => {
  return await StockInModel.findById(id).populate({
    path:'bookingId',
  });
};

const updateStockInInDB = async (id: string, payload: Partial<TStockIn>) => {
  const updateData = {
    ...payload,
    ...(payload.date && { date: new Date(payload.date) }),
  };

  return await StockInModel.findByIdAndUpdate(id, updateData, {
    new: true,
  }).populate({
    path:'bookingId',
  });
};

const deleteStockInFromDB = async (id: string) => {
  return await StockInModel.findByIdAndDelete(id);
};

export const StockInServices = {
  createStockInIntoDB,
  getAllStockIn,
  getStockInById,
  updateStockInInDB,
  deleteStockInFromDB,
};
