import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
// import { bookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';
import { bookingValidation } from './booking.validations';

const router = express.Router();

// Create Booking
router.post(
  '/',
  validateRequest(bookingValidation.createBookingValidationSchema),
  BookingController.createBooking,
);

// Get All Bookings
router.get('/', BookingController.getAllBookings);

// Get Booking by Booking No
router.get('/:bookingNo', BookingController.getBookingById);

// Update Booking

router.patch(
  '/:bookingNo',
  validateRequest(bookingValidation.updateBookingValidationSchema),
  BookingController.updateBooking,
);

// Delete Booking
router.delete('/:bookingNo', BookingController.deleteBooking);

export const BookingRoutes = router;
