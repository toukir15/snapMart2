import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CuponServices } from "./cupon.services";

const createCupon = catchAsync(async (req: Request, res: Response) => {
  const result = await CuponServices.createCupon(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create cupon successfully",
    data: result,
  });
});

export const CuponController = {
  createCupon,
};
