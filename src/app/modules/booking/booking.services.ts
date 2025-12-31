import { TBooking } from './booking.interface';
import { BookingModel } from './booking.model';
import { CustomerModel } from '../customer/customer.model';
import mongoose from 'mongoose';

const createBookingIntoDB = async (payload: TBooking) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // 1. Check customer
    let customer = await CustomerModel
      .findOne({ phone: payload.phone })
      

    // 2. Create customer if not exists
    if (!customer) {
     let customer = await CustomerModel.create(
        [
          {
            customerId: "CUS-" + Date.now(),
            name: payload.customerName,
            address: payload.address,
            phone: payload.phone,
          },
        ],
        { session }
      );

      payload.customerId = customer[0]?._id;
    } else {
      payload.customerId = customer._id;
    }

    // 3. Create booking
    const booking = await BookingModel.create(
      [payload],
      { session }
    );

    // 4. Commit transaction
    await session.commitTransaction();
    session.endSession();

    return booking[0];
  } catch (error) {
    // Rollback on error
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


const getAllBookings = async () => {
  const result = await BookingModel.find().sort({createdAt:-1});
  return result;
};

const getBookingById = async (bookingNo: string) => {
  const result = await BookingModel.findById( bookingNo );
 
  return result;
};

const updateBookingInDB = async (bookingNo: string, data: Partial<TBooking>) => {
 
  const result = await BookingModel.findByIdAndUpdate( bookingNo , data, { new: true });
  if(result){
    const newCustomerData= {
      name:result.customerName,
      address:result.address,
      phone:result?.phone
    }
    const customer= await CustomerModel.findByIdAndUpdate(result?.customerId,newCustomerData,{new:true});
  }


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
