import { Request } from 'express';
import { TBooking } from './booking.interface';
import { BookingModel } from './booking.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { PipelineStage } from 'mongoose';

export const buildDateMatch = (query: Record<string, unknown>) => {
  const startDate = query.startDate as string | undefined;
  const endDate = query.endDate as string | undefined;
  

  if (!startDate && !endDate) return {};

  const range: Record<string, Date> = {};

  if (startDate) {
    const s = new Date(startDate);
    s.setHours(0, 0, 0, 0);
    range.$gte = s;
  }

  if (endDate) {
    const e = new Date(endDate);
    e.setHours(23, 59, 59, 999);
    range.$lte = e;
  }

  return { date: range };
};

const createBookingIntoDB = async (payload: TBooking) => {
  try {
    const booking = await BookingModel.create(
      payload
    );
    return booking;
  } catch (error) {
    throw error;
  }
};


const getAllBookings = async (query:Record<string,unknown>) => {

  const result = new QueryBuilder(BookingModel.find(),query).dateRange().filter();
  const data= await  result.modelQuery;
  console.log(data);
  return data
};
const getCustomBookingsReport = async (query:Record<string,unknown>) => {
const match = buildDateMatch(query);

  const pipeline: PipelineStage[] = [
    { $match: match },

    {
      $group: {
        _id: null,

        // counts
        totalBookings: { $sum: 1 },

        totalNormalBookings: {
          $sum: { $cond: [{ $eq: ["$bookingType", "normal"] }, 1, 0] },
        },
        totalPaidBookings: {
          $sum: { $cond: [{ $eq: ["$bookingType", "paid"] }, 1, 0] },
        },

        // bags
        totalBagsNormal: {
          $sum: {
            $cond: [
              { $eq: ["$bookingType", "normal"] },
              { $ifNull: ["$qtyOfBags", 0] },
              0,
            ],
          },
        },
        totalBagsPaid: {
          $sum: {
            $cond: [
              { $eq: ["$bookingType", "paid"] },
              { $ifNull: ["$qtyOfBags", 0] },
              0,
            ],
          },
        },

        // 💰 amounts by type (NEW)
        totalAmountNormal: {
          $sum: {
            $cond: [
              { $eq: ["$bookingType", "normal"] },
              { $ifNull: ["$amount", 0] },
              0,
            ],
          },
        },
        totalAmountPaid: {
          $sum: {
            $cond: [
              { $eq: ["$bookingType", "paid"] },
              { $ifNull: ["$amount", 0] },
              0,
            ],
          },
        },

        // advance
        totalAdvanceAmount: {
          $sum: { $ifNull: ["$advanceAmount", 0] },
        },
      },
    },

    {
      $project: {
        _id: 0,
        totalBookings: 1,
        totalNormalBookings: 1,
        totalPaidBookings: 1,
        totalBagsNormal: 1,
        totalBagsPaid: 1,
        totalAmountNormal: 1,
        totalAmountPaid: 1,
        totalAdvanceAmount: 1,
      },
    },
  ];

  const [meta] = await BookingModel.aggregate(pipeline);

  return (
    meta ?? {
      totalBookings: 0,
      totalNormalBookings: 0,
      totalPaidBookings: 0,
      totalBagsNormal: 0,
      totalBagsPaid: 0,
      totalAmountNormal: 0,
      totalAmountPaid: 0,
      totalAdvanceAmount: 0,
    }
  );
};

const getBookingById = async (bookingNo: string) => {
  const result = await BookingModel.findById( bookingNo );
 
  return result;
};

const updateBookingInDB = async (bookingNo: string, data: Partial<TBooking>) => {
 
  const result = await BookingModel.findByIdAndUpdate( bookingNo , data, { new: true });
  return result;
};

const deleteBookingInDB = async (bookingNo: string) => {
  const result = await BookingModel.findByIdAndDelete( bookingNo );
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookings,
  getBookingById,
  updateBookingInDB,
  deleteBookingInDB,
  getCustomBookingsReport
};
