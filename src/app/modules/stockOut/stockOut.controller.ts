/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import catchAsync from '../../utils/catchAsync';
import { StockOutServices } from './stockOut.services';

const createStockOut = catchAsync(async (req, res) => {
  const data  = req.body;
  const result = await StockOutServices.createStockOutIntoDB(data);

  res.status(200).json({
    success: true,
    message: 'Stock out created successfully',
    data: result,
  });
});

const getAllStockOut = catchAsync(async (req, res) => {
  const result = await StockOutServices.getAllStockOut();

  res.status(200).json({
    success: true,
    message: 'Stock out list retrieved successfully',
    data: result,
  });
});

const getStockOutById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StockOutServices.getStockOutById(id);

  res.status(200).json({
    success: true,
    message: 'Stock out details retrieved successfully',
    data: result,
  });
});

const getBookingDetailsBySrNo=catchAsync(async(req,res)=>{
  const {srNo}= req.params;
  const result= await StockOutServices.getBookingDetailsBySrNo(srNo);

  if(!result) return res.status(404).json({
    success:false,
    message:'No matching stock in record found',
    data:null,
  })

  res.status(200).json({
    success:true,
    message:'Stock in record retrieved successfully',
    data:{
      bookingNo:result.bookingId,
    }
  })
})

const updateStockOut = catchAsync(async (req, res) => {
  const { id } = req.params;
  const  data  = req.body;

  const result = await StockOutServices.updateStockOutInDB(id, data);

  res.status(200).json({
    success: true,
    message: 'Stock In updated successfully',
    data: result,
  });
});

const deleteStockOut = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StockOutServices.deleteStockOutFromDB(id);

  res.status(200).json({
    success: true,
    message: 'Stock In deleted successfully',
    data: result,
  });
});

export const StockOutController = {
   createStockOut,
   getAllStockOut,
   getStockOutById,
   updateStockOut,
   deleteStockOut,
   getBookingDetailsBySrNo
};
