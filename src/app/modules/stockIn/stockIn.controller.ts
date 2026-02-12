import catchAsync from "../../utils/catchAsync";
import { StockInServices } from "./stockIn.services";

const createStockIn = catchAsync(async (req, res) => {
  const result = await StockInServices.createStockInIntoDB(req.body);

  res.status(201).json({
    success: true,
    message: "Stock In created successfully",
    data: result,
  });
});

const getAllStockIn = catchAsync(async (req, res) => {
  const result = await StockInServices.getAllStockIn();

  res.status(200).json({
    success: true,
    message: "Stock In list retrieved successfully",
    data: result,
  });
});

const getStockInById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StockInServices.getStockInById(id);

  res.status(200).json({
    success: true,
    message: "Stock In retrieved successfully",
    data: result,
  });
});

const updateStockIn = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StockInServices.updateStockInInDB(id, req.body);

  res.status(200).json({
    success: true,
    message: "Stock In updated successfully",
    data: result,
  });
});

const deleteStockIn = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StockInServices.deleteStockInFromDB(id);
console.log(result)
  res.status(200).json({
    success: true,
    message: "Stock In deleted successfully",
    data: result,
  });
});

export const StockInController = {
  createStockIn,
  getAllStockIn,
  getStockInById,
  updateStockIn,
  deleteStockIn,
};
