import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CuponServices } from "./cupon.service";

const getCoupons = catchAsync(async (req: Request, res: Response) => {
  const result = await CuponServices.getCupons();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupons retrive successfully",
    data: result,
  });
});

const getCoupon = catchAsync(async (req: Request, res: Response) => {
  const result = await CuponServices.getCupon(req.params.couponId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon retrive successfully",
    data: result,
  });
});

const createCupon = catchAsync(async (req: Request, res: Response) => {
  const result = await CuponServices.createCupon(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create coupon successfully",
    data: result,
  });
});

const editCoupon = catchAsync(async (req: Request, res: Response) => {
  const result = await CuponServices.editCoupon(req.params.couponId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Edit coupon successfully",
    data: result,
  });
});

const deleteCoupon = catchAsync(async (req: Request, res: Response) => {
  const result = await CuponServices.deleteCoupon(req.params.couponId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete coupon successfully",
    data: result,
  });
});

export const CouponControllers = {
  createCupon,
  editCoupon,
  deleteCoupon,
  getCoupons,
  getCoupon
};
