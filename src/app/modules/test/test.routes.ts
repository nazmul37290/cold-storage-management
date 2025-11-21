import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { testValidation } from './test.validations';
import { TestController } from './test.controller';

const router = express.Router();

router.post(
  '/test',
  validateRequest(testValidation.testValidatedSchema),
  TestController.createTestData,
);

export const testRoutes = router;
