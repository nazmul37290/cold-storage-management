import { z } from 'zod';

const createStockOutSchema =z.object({
  body:
  z.object({
  srNo: z.string().min(1, "SR No is required"),
  bookingNo: z.string().min(1, "Booking No is required"),
  customerName: z.string().min(1, "Customer Name is required"),
  bagsOut: z.number().min(0, "Bags Out must be 0 or greater"),
  rate: z.number().min(0, "Rate must be 0 or greater"),
  totalAmount: z.number().min(0, "Total Amount must be 0 or greater"),
  date: z.string(),
})})


const updateStockOutSchema = z.object({
  body:
  z.object({
  srNo: z.string().min(1, "SR No is required").optional(),
  bookingNo: z.string().min(1, "Booking No is required").optional(),
  customerName: z.string().min(1, "Customer Name is required").optional(),
  bagsOut: z.number().min(0, "Bags Out must be 0 or greater").optional(),
  rate: z.number().min(0, "Rate must be 0 or greater").optional(),
  totalAmount: z.number().min(0, "Total Amount must be 0 or greater").optional(),
  date: z.string().optional(),
})})

export const stockOutValidation = {
  createStockOutSchema,
  updateStockOutSchema,
};
