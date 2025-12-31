import { Schema, Types } from "mongoose";

export type TBooking = {
  sl: string;                              // Serial number
  bookingType: string;
  bookingNo: string;

  // Customer Details (Sent from frontend)
  customerName: string;
  address: string;
  phone: string;

  qty: number;                              // Bags
  rate: number;
  amount: number;                           // Manual / Auto

                          // Manual / Auto

  date: string;

  customerId?:Types.ObjectId;                      // Auto filled after creating Customer
  createdAt?: Date;
  updatedAt?: Date;
};
