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

const updateStockInInDB = async (id: string, data: Partial<TStockIn>) => {
  const result = await StockInModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
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
