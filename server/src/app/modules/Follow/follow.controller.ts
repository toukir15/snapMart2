import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { FollowServices } from "./follow.service";

const createFollow = catchAsync(async (req: Request, res: Response) => {
  const result = await FollowServices.createFollow(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create follow successfully",
    data: result,
  });
});

export const FollowController = {
  createFollow,
};
