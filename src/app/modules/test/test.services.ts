import { Ttest } from './test.interface';
import { testModel } from './test.model';

const createTestDataIntoDB = async (testData: Ttest) => {
  const result = await testModel.create(testData);
  return result;
};

export const TestServices = {
  createTestDataIntoDB,
};
