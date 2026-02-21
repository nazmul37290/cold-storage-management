import { Types } from "mongoose";

export type TStockOut = {
  srNo: string;
  bookingNo: string;
  bookingId: Types.ObjectId;
  bagsOut: number;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
};