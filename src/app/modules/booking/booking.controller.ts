import catchAsync from '../../utils/catchAsync';
import { BookingServices } from './booking.services';

const createBooking = catchAsync(async (req, res) => {
   const payload = {
    ...req.body,
    date: new Date(req.body.date), // ✅ convert ONCE here
  };
  const result = await BookingServices.createBookingIntoDB(payload);

  res.status(200).json({
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
    const query=req?.query
  const result = await BookingServices.getAllBookings(query);

  res.status(200).json({
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});
const getCustomBookingsReport = catchAsync(async (req, res) => {
    const query=req?.query
  const result = await BookingServices.getCustomBookingsReport(query);

  res.status(200).json({
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getBookingById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.getBookingById(id);

  res.status(200).json({
    success: true,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
const updateData = {
    ...req.body,
    ...(req.body.date && { date: new Date(req.body.date) }),
  };

  const result = await BookingServices.updateBookingInDB(id, updateData);

  res.status(200).json({
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingInDB(id);

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
  getCustomBookingsReport
};
