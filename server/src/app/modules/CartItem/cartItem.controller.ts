import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CartItemServices } from "./cartItem.service";
interface CustomRequest extends Request {
  user?: any;
}
const getCartItems = catchAsync(async (req: CustomRequest, res: Response) => {
  const result = await CartItemServices.getCartItems(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive cart items successfully",
    data: result,
  });
});

const updateCartItem = catchAsync(async (req: Request, res: Response) => {
  const result = await CartItemServices.updateCartItem(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update cart items successfully",
    data: result,
  });
});

const getAddToCartCount = catchAsync(async (req: CustomRequest, res: Response) => {
  const result = await CartItemServices.getAddToCartCount(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive cart item count successfully",
    data: result,
  });
});

export const CartItemControllers = {
  getCartItems,
  updateCartItem,
  getAddToCartCount
};
