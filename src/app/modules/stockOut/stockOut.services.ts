import { TStockOut } from './stockOut.interface';
import { StockOutModel } from './stockOut.model';

const createStockOutIntoDB = async (data: TStockOut) => {
  // Calculate total amount if not provided
  if (!data.totalAmount) {
    data.totalAmount = data.bagsOut * data.rate;
  }
  
  const result = await StockOutModel.create(data);
  return result;
};

const getAllStockOut = async () => {
  const result = await StockOutModel.find();
  return result;
};

const getStockOutById = async (id: string) => {
  const result = await StockOutModel.findById( id );
  return result;
};

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
};
