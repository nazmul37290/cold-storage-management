import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { bookingValidation } from './booking.validations';

const router = express.Router();

router.post(
  '/create-booking',
  validateRequest(bookingValidation.bookingValidationSchema),
  BookingController.createBooking,
);

export const bookingRoutes = router;
