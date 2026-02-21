import { model, Schema } from 'mongoose';
import { TStockOut } from './stockOut.interface';

const stockOutSchema = new Schema<TStockOut>(
  {
    srNo: { type: String, required: true },
    bookingNo: { type: String, required: true },
    bookingId: { type: Schema.Types.ObjectId, ref:"Booking", required: true },
    bagsOut: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export const StockOutModel = model<TStockOut>('StockOut', stockOutSchema);
