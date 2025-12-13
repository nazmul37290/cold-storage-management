export type TStockIn = {
  srNo: string;
  bookingNo: string;

  customerName: string;
  bagsIn: number;
  rate: number;
  totalAmount: number;

  date: string;

  createdAt?: Date;
  updatedAt?: Date;
};