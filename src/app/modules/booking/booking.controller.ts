import catchAsync from '../../utils/catchAsync';
import { BookingServices } from './booking.services';

const createBooking = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await BookingServices.createBookingIntoDB(data);

  res.status(200).json({
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookings();

  res.status(200).json({
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getBookingById = catchAsync(async (req, res) => {
  const { bookingNo } = req.params;
  const result = await BookingServices.getBookingById(bookingNo);

  res.status(200).json({
    success: true,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { bookingNo } = req.params;
  const data = req.body;

  const result = await BookingServices.updateBookingInDB(bookingNo, data);

  res.status(200).json({
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { bookingNo } = req.params;
  const result = await BookingServices.deleteBookingInDB(bookingNo);

  res.status(200).json({
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
