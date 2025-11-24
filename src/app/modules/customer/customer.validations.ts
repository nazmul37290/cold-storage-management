import { z } from 'zod';

const createCustomerSchema = z.object({
  customerId: z
    .string({ invalid_type_error: 'Customer ID must be a string' })
    .max(20, { message: 'Customer ID cannot be more than 20 characters' }),
  name: z
    .string({ invalid_type_error: 'Name must be a string' })
    .min(1, { message: 'Name is required' }),
  address: z
    .string({ invalid_type_error: 'Address must be a string' })
    .min(1, { message: 'Address is required' }),
  phone: z
    .string({ invalid_type_error: 'Phone must be a string' })
    .min(1, { message: 'Phone is required' }),
  notes: z.string().optional(),
});

const updateCustomerSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export const customerValidation = {
  createCustomerSchema,
  updateCustomerSchema,
};
