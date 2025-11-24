/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { CustomerServices } from './customer.services';

const createCustomer = catchAsync(async (req, res, next) => {
  const { data } = req.body;
  const result = await CustomerServices.createCustomerInDB(data);
  res.status(200).json({
    success: true,
    message: 'Customer created successfully',
    data: result,
  });
});

const getCustomers = catchAsync(async (req, res, next) => {
  const result = await CustomerServices.getAllCustomers();
  res.status(200).json({
    success: true,
    message: 'Customers fetched successfully',
    data: result,
  });
});

const getCustomerById = catchAsync(async (req, res, next) => {
  const { customerId } = req.params;
  const result = await CustomerServices.getCustomerById(customerId);
  res.status(200).json({
    success: true,
    message: 'Customer fetched successfully',
    data: result,
  });
});

const updateCustomer = catchAsync(async (req, res, next) => {
  const { customerId } = req.params;
  const { data } = req.body;
  const result = await CustomerServices.updateCustomerInDB(customerId, data);
  res.status(200).json({
    success: true,
    message: 'Customer updated successfully',
    data: result,
  });
});

const deleteCustomer = catchAsync(async (req, res, next) => {
  const { customerId } = req.params;
  const result = await CustomerServices.deleteCustomerInDB(customerId);
  res.status(200).json({
    success: true,
    message: 'Customer deleted successfully',
    data: result,
  });
});

export const CustomerController = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
