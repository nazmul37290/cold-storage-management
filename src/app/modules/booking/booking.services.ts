import { TBooking } from './booking.interface';
import { BookingModel } from './booking.model';
import { CustomerModel } from '../customer/customer.model';

const createBookingIntoDB = async (payload: TBooking) => {
  // 1. Create customer first
  const createdCustomer = await CustomerModel.create({
    customerId: 'CUS-' + Date.now(),
    name: payload.customerName,
    address: payload.address,
    phone: payload.phone,
  });

  // 2. Add customerId into booking
  payload.customerId = createdCustomer.customerId;

  // 3. Create booking
  const result = await BookingModel.create(payload);

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
};
