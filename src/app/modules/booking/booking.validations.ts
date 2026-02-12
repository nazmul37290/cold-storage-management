import { z } from "zod";

const bookingTypeEnum = z.enum(["paid", "normal"]);

const createBookingValidationSchema = z.object({
  body: z.object({
    bookingType: bookingTypeEnum.default("paid"),
    bookingNo: z.string().min(1, "bookingNo is required"),

    customerName: z.string().min(1, "customerName is required"),
    address: z.string().min(1, "address is required"),
    phone: z.string().min(1, "phone is required"),

    qtyOfBags: z.number().positive("Quantity of bags must be greater than 0"),
    rate: z.number().nonnegative("rate cannot be negative"),
    amount: z.number().nonnegative("amount cannot be negative"),

    date: z.string().min(1, "date is required"),

    advanceAmount: z.number().nonnegative("advanceAmount cannot be negative").optional(),
  }),
});

const updateBookingValidationSchema = z.object({
  body: z.object({
    bookingType: bookingTypeEnum.optional(),
    bookingNo: z.string().min(1).optional(),

    customerName: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
    phone: z.string().min(1).optional(),

    qtyOfBags: z.number().positive().optional(),
    rate: z.number().nonnegative().optional(),
    amount: z.number().nonnegative().optional(),

    date: z.string().min(1).optional(),

    advanceAmount: z.number().nonnegative().optional(),
  }),
});

export const bookingValidation = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
