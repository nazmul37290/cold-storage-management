import { model, Schema } from 'mongoose';
import { TCustomer } from './customer.interface';

const customerSchema = new Schema<TCustomer>(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const CustomerModel = model<TCustomer>('Customer', customerSchema);
