import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { userService } from "./user.service";

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive users successfuly!",
    data: result,
  });
});
const getAdmins = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAdmins();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive admins successfuly!",
    data: result,
  });
});
const getVendors = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getVendors();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive vendors successfuly!",
    data: result,
  });
});
const getCustomers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getCustomers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrive customers successfuly!",
    data: result,
  });
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Created successfuly!",
    data: result,
  });
});

const createVendor = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createVendor(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor Created successfuly!",
    data: result,
  });
});

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createCustomer(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer Created successfuly!",
    data: result,
  });
});

const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const newStatus = req.body.status;
  console.log(newStatus)
  const result = await userService.updateStatus(userId, newStatus);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update user status successfuly!",
    data: result,
  });
});


export const userController = {
  createAdmin,
  createVendor,
  createCustomer,
  getUsers,
  updateStatus,
  getAdmins,
  getVendors,
  getCustomers
};
