import express from 'express';
import { testRoutes } from '../modules/test/test.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/text',
    routes: testRoutes,
  },
];

moduleRoutes.map((route) => router.use(route.path, route.routes));
export default router;
