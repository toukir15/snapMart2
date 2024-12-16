import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CategoryServices } from "./category.service";

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getCategories();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories retrives successfully",
    data: result,
  });
});

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.createCategory(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create category successfully",
    data: result,
  });
});

const editCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  const result = await CategoryServices.editCategory(categoryId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Edit category successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.deleteCategory(req.params.categoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete category successfully",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  editCategory,
  deleteCategory,
  getCategories,
};
