import { model, Schema } from 'mongoose';
import { TStockIn } from './stockIn.interface';

const stockInSchema = new Schema<TStockIn>(
  {
    srNo: { type: String, required: true },
    bookingNo: { type: String, required: true },

    customerName: { type: String, required: true },
    bagsIn: { type: Number, required: true },
    rate: { type: Number, required: true },
    totalAmount: { type: Number, required: true },

    date: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const StockInModel = model<TStockIn>('StockIn', stockInSchema);
