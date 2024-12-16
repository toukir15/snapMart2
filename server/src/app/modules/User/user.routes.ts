import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { userValidation } from "./user.validation";
import { multerUpload } from "../../../helpars/multerUpload";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), userController.getUsers);

router.post(
  "/create-admin",
  // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return userController.createAdmin(req, res, next);
  }
);

router.post(
  "/create-vendor",
  // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createVendor.parse(JSON.parse(req.body.data));
    return userController.createVendor(req, res, next);
  }
);

router.post(
  "/create-customer",
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createCustomer.parse(JSON.parse(req.body.data));
    return userController.createCustomer(req, res, next);
  }
);
router.delete("/", userController.deleteUsers);

router.patch(
  "/change-status/:userId",
  auth(UserRole.ADMIN),
  userController.updateStatus
);

export const userRoutes = router;
