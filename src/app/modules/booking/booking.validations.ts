import { z } from 'zod';

const bookingValidationSchema = z.object({
  sl: z.string(),
  bookingType: z.enum(['Normal', 'Paid']),
  bookingNo: z.string(),

  customerName: z.string(),
  address: z.string(),
  phone: z.string(),

  qty: z.number(),
  rate: z.number(),
  amount: z.number(),
  paid: z.number(),
  balance: z.number(),

  date: z.string(),
});

export const bookingValidation = {
  bookingValidationSchema,
};
