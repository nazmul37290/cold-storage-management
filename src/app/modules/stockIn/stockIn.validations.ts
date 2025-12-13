import { z } from 'zod';

const createStockInSchema =z.object({
  body:
  z.object({
     srNo: z.string(),
     bookingNo: z.string(),
   
     customerName: z.string(),
     bagsIn: z.number(),
     rate: z.number(),
     totalAmount: z.number(),
   
     date: z.string(),
   })
})


const updateStockInSchema = z.object({
  customerName: z.string().optional(),
  bagsIn: z.number().optional(),
  rate: z.number().optional(),
  totalAmount: z.number().optional(),
  date: z.string().optional(),
});

export const stockInValidation = {
  createStockInSchema,
  updateStockInSchema,
};
