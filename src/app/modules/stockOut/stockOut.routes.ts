import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StockOutController } from './stockOut.controller';
import { stockOutValidation } from './stockOut.validations';

const router = express.Router();

router.post(
  '/',
  validateRequest(stockOutValidation.createStockOutSchema),
  StockOutController.createStockOut,
);

router.get('/', StockOutController.getAllStockOut);

router.get('/:id', StockOutController.getStockOutById);

router.patch(
  '/:id',
  validateRequest(stockOutValidation.updateStockOutSchema),
  StockOutController.updateStockOut,
);

router.delete('/:id', StockOutController.deleteStockOut);

export const stockOutRoutes = router;
