import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CartServices } from "./cart.service";

interface CustomRequest extends Request {
  user?: any;
}

const createCart = catchAsync(async (req: CustomRequest, res: Response) => {
  const result = await CartServices.createCart(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create cart successfully",
    data: result,
  });
});

const getCarts = catchAsync(async (req: CustomRequest, res: Response) => {
  const result = await CartServices.getCarts(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive carts successfully",
    data: result,
  });
});

export const CartControllers = {
  createCart,
  getCarts,
};
