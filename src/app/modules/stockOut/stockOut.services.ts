import { PipelineStage } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { buildDateMatch } from '../booking/booking.services';
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
  console.log(data,'data00000')
 return data;

};
const getCustomStockOutReport = async (query:Record<string,unknown>) => {
const match = buildDateMatch(query);
console.log(match)
  const pipeline: PipelineStage[] = [
    { $match: match },
    {
      $lookup:{
        from:'bookings',
        localField:"bookingId",
        foreignField:"_id",
        as:'booking'
      },
    },
    {
      $unwind:"$booking"
    },

    {
      $group: {
        _id: null,
        // counts
        totalStockOuts: { $sum: 1 },

        totalNormalStockOuts: {
          $sum: { $cond: [{ $eq: ["$booking.bookingType", "normal"] }, 1, 0] },
        },
        totalPaidStockOuts: {
          $sum: { $cond: [{ $eq: ["$booking.bookingType", "paid"] }, 1, 0] },
        },

        // bags 
        totalBagsOutNormal: {
          $sum: {
            $cond: [
              { $eq: ["$booking.bookingType", "normal"] },
              { $ifNull: ["$bagsOut", 0] },
              0,
            ],
          },
        },
        totalBagsOutPaid: {
          $sum: {
            $cond: [
              { $eq: ["$booking.bookingType", "paid"] },
              { $ifNull: ["$bagsOut", 0] },
              0,
            ],
          },
        },
       
      },
    },

    {
      $project: {
        _id: 0,
        totalStockOuts: 1,
        totalNormalStockOuts: 1,
        totalPaidStockOuts: 1,
        totalBagsOutNormal: 1,
        totalBagsOutPaid: 1,
      },
    },
  ];

  const [meta] = await StockOutModel.aggregate(pipeline);
console.log(meta)
  return (
    meta ?? {
       totalStockOuts: 0,
        totalNormalStockOuts: 0,
        totalPaidStockOuts: 0,
        totalBagsOutNormal: 0,
        totalBagsOutPaid: 0,
    }
  );
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
   getCustomStockOutReport,
  updateStockOutInDB,
  deleteStockOutFromDB,
  getBookingDetailsBySrNo
};
