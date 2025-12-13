/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import catchAsync from '../../utils/catchAsync';
import { StockInServices } from './stockIn.services';

const createStockIn = catchAsync(async (req, res) => {
  const data  = req.body;
  const result = await StockInServices.createStockInIntoDB(data);

  res.status(200).json({
    success: true,
    message: 'Stock In created successfully',
    data: result,
  });
});

const getAllStockIn = catchAsync(async (req, res) => {
  const result = await StockInServices.getAllStockIn();

  res.status(200).json({
    success: true,
    message: 'Stock In list retrieved successfully',
    data: result,
  });
});

const getStockInBySRNo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StockInServices.getStockInById(id);

  res.status(200).json({
    success: true,
    message: 'Stock In retrieved successfully',
    data: result,
  });
});

const updateStockIn = catchAsync(async (req, res) => {
  const { id } = req.params;
  const  data  = req.body;

  const result = await StockInServices.updateStockInInDB(id, data);

  res.status(200).json({
    success: true,
    message: 'Stock In updated successfully',
    data: result,
  });
});

const deleteStockIn = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StockInServices.deleteStockInFromDB(id);

  res.status(200).json({
    success: true,
    message: 'Stock In deleted successfully',
    data: result,
  });
});

export const StockInController = {
  createStockIn,
  getAllStockIn,
  getStockInBySRNo,
  updateStockIn,
  deleteStockIn,
};
