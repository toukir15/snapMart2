import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewService } from "./review.service";
import { pick } from "../../../shared/pick";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReview(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create review successfully",
    data: result,
  });
});

const getReviews = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "limit"]);
  const result = await ReviewService.getReviews(options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive reviews successfully",
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getReviews,
};
