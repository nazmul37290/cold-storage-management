import catchAsync from "../../utils/catchAsync";
import { StatisticsServices } from "./statistics.services";


const getAllStatistics = catchAsync(async (req, res) => {
   const query=req?.query
  const result = await StatisticsServices.getAllStatistics(query);

  res.status(200).json({
    success: true,
    message: "Statistics retrieved successfully",
    data: result,
  });
});



export const StatisticsController = {
  getAllStatistics,
};
