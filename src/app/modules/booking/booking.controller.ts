import catchAsync from '../../utils/catchAsync';
import { BookingServices } from './booking.services';

const createBooking = catchAsync(async (req, res, next) => {
  const { data } = req.body;
  console.log(data);
  const result = await BookingServices.createBookingIntoDB(data);

  res.status(200).json({
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
};
