import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { customerValidation } from './customer.validations';
import { CustomerController } from './customer.controller';

const router = express.Router();

// Create Customer
router.post(
  '/create',
  validateRequest(customerValidation.createCustomerSchema),
  CustomerController.createCustomer,
);

// Get All Customers
router.get(
  '/',
  CustomerController.getCustomers,
);

// Get Customer by ID
router.get(
  '/:customerId',
  CustomerController.getCustomerById,
);

// Update Customer
router.put(
  '/:customerId',
  validateRequest(customerValidation.updateCustomerSchema),
  CustomerController.updateCustomer,
);

// Delete Customer
router.delete(
  '/:customerId',
  CustomerController.deleteCustomer,
);

export const customerRoutes = router;
