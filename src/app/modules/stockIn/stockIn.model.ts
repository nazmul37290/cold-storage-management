import { model, Schema } from 'mongoose';
import { TStockIn } from './stockIn.interface';

const stockInSchema = new Schema<TStockIn>(
  {
    srNo: { type: String, required: true },
    bookingId: { type: Schema.Types.ObjectId,ref:"Booking", required: true },
    bookingNo: { type: String, required: true },
    bagsIn: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

// stockInSchema.pre("save", function (next) {
//   if (this.isNew) {
//     this.availableBags = this.bagsIn;
//   }
//   next();
// });


export const StockInModel = model<TStockIn>('StockIn', stockInSchema);
