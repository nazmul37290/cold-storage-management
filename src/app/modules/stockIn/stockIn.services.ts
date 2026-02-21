import { StockInModel } from "./stockIn.model";
import { TStockIn } from "./stockIn.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { buildDateMatch } from "../booking/booking.services";
import { PipelineStage } from "mongoose";

const createStockInIntoDB = async (payload: TStockIn) => {
  const result = await StockInModel.create({
    ...payload,
    date: new Date(payload.date), // safe conversion if date picker
  });

  return result.populate({
    path:'bookingId',
  });
};

const getAllStockIn = async (query:Record<string,unknown>) => {

let result;
if(query.bookingNo){
  result = new QueryBuilder(StockInModel.find().populate({path:'bookingId'}),query).dateRange().filter()
}
else{
  result = new QueryBuilder(StockInModel.find().populate({path:'bookingId'}),query).dateRange()
}
  const data= await result.modelQuery;
 return data
};

const getCustomStockInReport = async (query:Record<string,unknown>) => {
const match = buildDateMatch(query);

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
        totalStockIns: { $sum: 1 },

        totalNormalStockIns: {
          $sum: { $cond: [{ $eq: ["$booking.bookingType", "normal"] }, 1, 0] },
        },
        totalPaidStockIns: {
          $sum: { $cond: [{ $eq: ["$booking.bookingType", "paid"] }, 1, 0] },
        },

        // bags
        totalBagsInNormal: {
          $sum: {
            $cond: [
              { $eq: ["$booking.bookingType", "normal"] },
              { $ifNull: ["$bagsIn", 0] },
              0,
            ],
          },
        },
        totalBagsInPaid: {
          $sum: {
            $cond: [
              { $eq: ["$booking.bookingType", "paid"] },
              { $ifNull: ["$bagsIn", 0] },
              0,
            ],
          },
        },
       
      },
    },

    {
      $project: {
        _id: 0,
        totalStockIns: 1,
        totalNormalStockIns: 1,
        totalPaidStockIns: 1,
        totalBagsInNormal: 1,
        totalBagsInPaid: 1,
      },
    },
  ];

  const [meta] = await StockInModel.aggregate(pipeline);
console.log(meta,'meta')
  return (
    meta ?? {
      totalStockIns: 0,
        totalNormalStockIns: 0,
        totalPaidStockIns: 0,
        totalBagsInNormal: 0,
        totalBagsInPaid: 0,
    }
  );
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
  getCustomStockInReport
};
