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

const editShop = catchAsync(async (req: Request, res: Response) => {
  const result = await ShopServices.editShop(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Edit shop successfully",
    data: result,
  });
});

const getShop = catchAsync(async (req: Request, res: Response) => {
  const shopId = req.params.shopId
  const result = await ShopServices.getShop(shopId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive shop successfully",
    data: result,
  });
});
const getShops = catchAsync(async (req: Request, res: Response) => {
  const result = await ShopServices.getShops();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive shops successfully",
    data: result,
  });
});

const updateShopStatus = catchAsync(async (req: Request, res: Response) => {
  const shopId = req.params.shopId;
  const result = await ShopServices.updateShopStatus(shopId, req.body.isActive);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update black list status successfully",
    data: result,
  });
});

export const ShopController = {
  createShop,
  updateShopStatus,
  getShop,
  getShops,
  editShop
};
