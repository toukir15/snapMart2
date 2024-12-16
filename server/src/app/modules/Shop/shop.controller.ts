import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ShopServices } from "./shop.service";

const createShop = catchAsync(async (req: Request, res: Response) => {
  const result = await ShopServices.createShop(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create shop successfully",
    data: result,
  });
});

const blackListShop = catchAsync(async (req: Request, res: Response) => {
  const shopId = req.params.shopId;
  const result = await ShopServices.blackListShop(shopId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update black list status successfully",
    data: result,
  });
});

export const ShopController = {
  createShop,
  blackListShop,
};
