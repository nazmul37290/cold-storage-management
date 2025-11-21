/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';

import { Ttest } from './test.interface';
const testSchema = new Schema<Ttest>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const testModel = model<Ttest>('test', testSchema);
