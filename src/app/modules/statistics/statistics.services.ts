
import QueryBuilder from "../../builder/QueryBuilder";
import { buildDateMatch } from "../booking/booking.services";
import { PipelineStage } from "mongoose";
import { StockOutModel } from "../stockOut/stockOut.model";
import { StockInModel } from "../stockIn/stockIn.model";
import { BookingModel } from "../booking/booking.model";



const getAllStatistics = async (query: Record<string, unknown>) => {
  const { startDate, endDate, bookingNo } = query;

  /* ===============================
     DATE FILTER
  ================================= */
  const dateFilter: any = {};

  if (startDate || endDate) {
    dateFilter.date = {};

    if (startDate) {
      const s = new Date(startDate as string);
      s.setHours(0, 0, 0, 0);
      dateFilter.date.$gte = s;
    }

    if (endDate) {
      const e = new Date(endDate as string);
      e.setHours(23, 59, 59, 999);
      dateFilter.date.$lte = e;
    }
  }

  /* ===============================
     BOOKING FILTER
  ================================= */
  const bookingFilter: any = { ...dateFilter };

  if (bookingNo) {
    bookingFilter.bookingNo = bookingNo;
  }

  /* ===============================
     BOOKINGS STATS
  ================================= */
  const bookingStats = await BookingModel.aggregate([
    { $match: bookingFilter },
    {
      $group: {
        _id: null,
        totalBookings: { $sum: 1 },

        totalPaidBookings: {
          $sum: {
            $cond: [{ $eq: ["$bookingType", "paid"] }, 1, 0],
          },
        },

        totalNormalBookings: {
          $sum: {
            $cond: [{ $eq: ["$bookingType", "normal"] }, 1, 0],
          },
        },

        totalRevenue: {
          $sum: {
            $multiply: ["$qtyOfBags", "$rate"],
          },
        },

        totalNormalBookedBags: {
          $sum: {
            $cond: [
              { $eq: ["$bookingType", "normal"] },
              "$qtyOfBags",
              0,
            ],
          },
        },

        totalPaidBookedBags: {
          $sum: {
            $cond: [
              { $eq: ["$bookingType", "paid"] },
              "$qtyOfBags",
              0,
            ],
          },
        },
      },
    },
  ]);

  /* ===============================
     STOCK IN FILTER
  ================================= */
  const stockInFilter: any = { ...dateFilter };
  if (bookingNo) stockInFilter.bookingNo = bookingNo;

  const stockInStats = await StockInModel.aggregate([
    { $match: stockInFilter },
    {
      $group: {
        _id: null,
        totalBagsIn: { $sum: "$bagsIn" },
      },
    },
  ]);

  /* ===============================
     STOCK OUT FILTER
  ================================= */
  const stockOutFilter: any = { ...dateFilter };
  if (bookingNo) stockOutFilter.bookingNo = bookingNo;

  const stockOutStats = await StockOutModel.aggregate([
    { $match: stockOutFilter },
    {
      $group: {
        _id: null,
        totalBagsOut: { $sum: "$bagsOut" },
      },
    },
  ]);

  /* ===============================
     FINAL RESPONSE
  ================================= */
  const bookings = bookingStats[0] || {};
  const stockIn = stockInStats[0] || {};
  const stockOut = stockOutStats[0] || {};

  const totalBagsIn = stockIn.totalBagsIn || 0;
  const totalBagsOut = stockOut.totalBagsOut || 0;

  return {
    totalBookings: bookings.totalBookings || 0,
    totalPaidBookings: bookings.totalPaidBookings || 0,
    totalNormalBookings: bookings.totalNormalBookings || 0,
    totalNormalBookedBags: bookings.totalNormalBookedBags || 0,
    totalPaidBookedBags: bookings.totalPaidBookedBags || 0,
    totalRevenue: bookings.totalRevenue || 0,

    totalBagsIn,
    totalBagsOut,
    totalStockBalance: totalBagsIn - totalBagsOut,
  };
};

export const StatisticsServices = {
 getAllStatistics,
};
