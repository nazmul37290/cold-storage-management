import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    bookingType: { 
      type: String,
      enum:['paid','normal'],
      required: true,
      default:'paid', 
    },
    bookingNo: { type: String, required: true },

    customerName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },

    qtyOfBags: { type: Number, required: true },
    rate: { type: Number, required: true },
    amount: { type: Number, required: true },

    date: { type: Date, required: true },

    advanceAmount: { type: Number }, // Filled after customer creation
  },
  {
    timestamps: true,
  },
);

export const BookingModel = model<TBooking>('Booking', bookingSchema);
