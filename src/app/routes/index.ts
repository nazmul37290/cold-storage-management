import express from 'express';
import { testRoutes } from '../modules/test/test.routes';
import { customerRoutes } from '../modules/customer/customer.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { stockInRoutes } from '../modules/stockIn/stockIn.routes';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/customers',
    routes: customerRoutes,
  },
  {
    path: '/bookings',
    routes: BookingRoutes,
  },
  {
    path: '/stock-ins',
    routes: stockInRoutes,
  },
];

moduleRoutes.map((route) => router.use(route.path, route.routes));
export default router;
