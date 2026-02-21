import QueryBuilder from '../../builder/QueryBuilder';
import { StockInModel } from '../stockIn/stockIn.model';
import { TStockOut } from './stockOut.interface';
import { StockOutModel } from './stockOut.model';

const createStockOutIntoDB = async (data: TStockOut) => {


 const stockIn = await StockInModel.find(
      {
        srNo: data.srNo,
      }
    );
console.log(stockIn)
  if(stockIn.length < 1){
    throw new Error('No matching Stock In record found for the provided sr no');
  }

  const result = await StockOutModel.create(data);
  return result;
};

const getAllStockOut = async (query:Record<string,unknown>) => {

 const result = new QueryBuilder(StockOutModel.find().populate({path:'bookingId'}).sort({createdAt:-1}),query).dateRange().filter()

  const data= await result.modelQuery;
  console.log(data,'data')
 return data;

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
