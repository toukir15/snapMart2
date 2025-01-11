import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BrandServices } from "./brand.service";

const getBrands = catchAsync(async (req: Request, res: Response) => {
  const result = await BrandServices.getBrands();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brands retrives successfully",
    data: result,
  });
});

const getBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await BrandServices.getBrand(req.params.brandId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand retrives successfully",
    data: result,
  });
});

const createBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await BrandServices.createBrand(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create brand successfully",
    data: result,
  });
});

const editBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await BrandServices.editBrand(req.params.brandId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Edit brand successfully",
    data: result,
  });
});

const deleteBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await BrandServices.deleteBrand(req.params.brandId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete brand successfully",
    data: result,
  });
});

export const BrandController = {
  createBrand,
  editBrand,
  deleteBrand,
  getBrands,
  getBrand
};
