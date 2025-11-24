import express from 'express';
import { testRoutes } from '../modules/test/test.routes';
import { customerRoutes } from '../modules/customer/customer.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/customers',
    routes: customerRoutes,
  },
];

moduleRoutes.map((route) => router.use(route.path, route.routes));
export default router;
