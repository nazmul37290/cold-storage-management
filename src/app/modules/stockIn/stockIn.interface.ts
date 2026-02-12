import { Types } from "mongoose";

export type TStockIn = {
  srNo: string;
  bookingId: Types.ObjectId;
  bookingNo:string;
  bagsIn: number;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
};