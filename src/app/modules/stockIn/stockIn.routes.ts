import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StockInController } from './stockIn.controller';
import { stockInValidation } from './stockIn.validations';

const router = express.Router();

router.post(
  '/',
  validateRequest(stockInValidation.createStockInSchema),
  StockInController.createStockIn,
);

router.get('/', StockInController.getAllStockIn);

router.get('/:id', StockInController.getStockInById);

router.patch(
  '/:id',
  validateRequest(stockInValidation.updateStockInSchema),
  StockInController.updateStockIn,
);

router.delete('/:id', StockInController.deleteStockIn);

export const stockInRoutes = router;
