import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    sl: { type: String, required: true },
    bookingType: { type: String, enum: ['Normal', 'Paid'], required: true },
    bookingNo: { type: String, required: true },

    customerName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },

    qty: { type: Number, required: true },
    rate: { type: Number, required: true },
    amount: { type: Number, required: true },
    paid: { type: Number, required: true },
    balance: { type: Number, required: true },

    date: { type: String, required: true },

    customerId: { type: String }, // Filled after customer creation
  },
  {
    timestamps: true,
  },
);

export const BookingModel = model<TBooking>('Booking', bookingSchema);
