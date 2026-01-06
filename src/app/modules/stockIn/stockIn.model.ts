import { model, Schema } from 'mongoose';
import { TStockIn } from './stockIn.interface';

const stockInSchema = new Schema<TStockIn>(
  {
    srNo: { type: String, required: true, unique: true },
    bookingNo: { type: String, required: true },
    customerName: { type: String, required: true },
    bagsIn: { type: Number, required: true },
    availableBags: { type: Number, min: 0 },
    rate: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

stockInSchema.pre("save", function (next) {
  if (this.isNew) {
    this.availableBags = this.bagsIn;
  }
  next();
});


export const StockInModel = model<TStockIn>('StockIn', stockInSchema);
