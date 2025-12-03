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


const getAllBookings = async () => {
  const result = await BookingModel.find();
  return result;
};

const getBookingById = async (bookingNo: string) => {
  const result = await BookingModel.findById( bookingNo );
 
  return result;
};

const updateBookingInDB = async (bookingNo: string, data: Partial<TBooking>) => {
  console.log(bookingNo)
  const result = await BookingModel.findByIdAndUpdate( bookingNo , data, { new: true });
  return result;
};

const deleteBookingInDB = async (bookingNo: string) => {
  const result = await BookingModel.findByIdAndDelete( bookingNo );
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookings,
  getBookingById,
  updateBookingInDB,
  deleteBookingInDB,
};
