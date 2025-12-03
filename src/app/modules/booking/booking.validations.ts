import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body:z.object({
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
  })
});
const updateBookingValidationSchema = z.object({
  body:z.object({
    sl: z.string().optional(),
    bookingType: z.enum(['Normal', 'Paid']).optional(),
    bookingNo: z.string().optional(),
    customerName: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    qty: z.number().optional(),
    rate: z.number().optional(),
    amount: z.number().optional(),
    paid: z.number().optional(),
    balance: z.number().optional(),
    date: z.string().optional(),
  })
});

export const bookingValidation = {
 createBookingValidationSchema,
 updateBookingValidationSchema
 
};
