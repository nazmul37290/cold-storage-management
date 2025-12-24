import { model, Schema } from 'mongoose';
import { TStockOut } from './stockOut.interface';

const stockOutSchema = new Schema<TStockOut>(
  {
    srNo: { type: String, required: true },
    bookingNo: { type: String, required: true },

    customerName: { type: String, required: true },
    bagsOut: { type: Number, required: true },
    rate: { type: Number, required: true },
    totalAmount: { type: Number, required: true },

    date: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const StockOutModel = model<TStockOut>('StockOut', stockOutSchema);
