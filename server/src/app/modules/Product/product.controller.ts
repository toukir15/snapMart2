import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ProductService } from "./product.service";
import { pick } from "../../../shared/pick";

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm", "category", "brand", "price"]);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await ProductService.getProducts(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive products successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getFlashSaleProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm", "category", "price"]);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await ProductService.getFlashSaleProducts(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive flash sale products successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSuggestedProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getSuggestedProducts(
    req.params.productId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive suggested products successfully",
    data: result,
  });
});

const getBrands = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getBrands();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive brands successfully",
    data: result,
  });
});

const getProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.productId;
  const result = await ProductService.getProduct(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive product successfully",
    data: result,
  });
});

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create product successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.updateProduct(
    req.params.productId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update product successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.deleteProduct(req.params.productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete product successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getFlashSaleProducts,
  getProduct,
  getSuggestedProducts,
  getBrands,
};
