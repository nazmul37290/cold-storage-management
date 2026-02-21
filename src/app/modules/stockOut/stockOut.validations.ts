import { z } from 'zod';

const createStockOutSchema =z.object({
  body:
  z.object({
  srNo: z.string().min(1, "SR No is required"),
  bookingNo: z.string().min(1, "Booking No is required"),
  bookingId: z.string().min(1, "Booking Id is required"),
  bagsOut: z.number().min(0, "Bags Out must be 0 or greater"),
  date: z.string(),
})})


const updateStockOutSchema = z.object({
  body:
  z.object({
  srNo: z.string().min(1, "SR No is required").optional(),
  bookingNo: z.string().min(1, "Booking No is required").optional(),
  bagsOut: z.number().min(0, "Bags Out must be 0 or greater").optional(),
  date: z.string().optional(),
})})

export const stockOutValidation = {
  createStockOutSchema,
  updateStockOutSchema,
};
