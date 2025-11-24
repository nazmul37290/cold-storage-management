import { TCustomer } from './customer.interface';
import { CustomerModel } from './customer.model';

const createCustomerInDB = async (data: TCustomer) => {
  const result = await CustomerModel.create(data);
  return result;
};

const getAllCustomers = async () => {
  const result = await CustomerModel.find();
  return result;
};

const getCustomerById = async (customerId: string) => {
  const result = await CustomerModel.findOne({ customerId });
  return result;
};

const updateCustomerInDB = async (customerId: string, data: Partial<TCustomer>) => {
  const result = await CustomerModel.findOneAndUpdate({ customerId }, data, { new: true });
  return result;
};

const deleteCustomerInDB = async (customerId: string) => {
  const result = await CustomerModel.findOneAndDelete({ customerId });
  return result;
};

export const CustomerServices = {
  createCustomerInDB,
  getAllCustomers,
  getCustomerById,
  updateCustomerInDB,
  deleteCustomerInDB,
};
