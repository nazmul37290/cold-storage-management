import { z } from 'zod';

const testValidationSchema = z.object({
  id: z
    .string({ invalid_type_error: 'Id must be a string' })
    .max(20, { message: 'Id can no be more than 20 characters' })
    .optional(),
});

export const testValidation = {
  testValidatedSchema: testValidationSchema,
};
