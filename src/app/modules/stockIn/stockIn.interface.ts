export type TStockIn = {
  srNo: string;
  bookingNo: string;

  customerName: string;
  bagsIn: number;
  rate: number;
  availableBags?:number;
  totalAmount: number;

  date: string;

  createdAt?: Date;
  updatedAt?: Date;
};