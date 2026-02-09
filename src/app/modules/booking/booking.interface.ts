export type TBooking = {                          
  bookingType: "paid" | "normal";
  bookingNo: string;
  customerName: string;
  address: string;
  phone: string;
  qtyOfBags: number;                           
  rate: number;
  amount: number;
  date: Date;
  advanceAmount?: string;                     
  createdAt?: Date;
  updatedAt?: Date;
};
