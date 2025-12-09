export type TBooking = {
  sl: string;                              // Serial number
  bookingType: string;
  bookingNo: string;

  // Customer Details (Sent from frontend)
  customerName: string;
  address: string;
  phone: string;

  qty: number;                              // Bags
  rate: number;
  amount: number;                           // Manual / Auto

  balance: number;                          // Manual / Auto

  date: string;

  customerId?: string;                      // Auto filled after creating Customer
  createdAt?: Date;
  updatedAt?: Date;
};
