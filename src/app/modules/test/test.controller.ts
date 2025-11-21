/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';

import catchAsync from '../../utils/catchAsync';
import { TestServices } from './test.services';

const createTestData = catchAsync(async (req, res, next) => {
  const { data } = req.body;
  const result = await TestServices.createTestDataIntoDB(data);
  res.status(200).json({
    success: true,
    message: 'Test created successfully',
    data: result,
  });
});

export const TestController = {
  createTestData,
};
