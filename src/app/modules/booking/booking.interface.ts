export type TBooking = {
  sl: string;                              // Serial number
  bookingType: 'Normal' | 'Paid';
  bookingNo: string;

  // Customer Details (Sent from frontend)
  customerName: string;
  address: string;
  phone: string;

  qty: number;                              // Bags
  rate: number;
  amount: number;                           // Manual / Auto
  paid: number;
  balance: number;                          // Manual / Auto

  date: string;

  customerId?: string;                      // Auto filled after creating Customer
  createdAt?: Date;
  updatedAt?: Date;
};
