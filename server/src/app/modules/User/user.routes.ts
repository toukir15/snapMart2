import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { userValidation } from "./user.validation";
import { multerUpload } from "../../../helpars/multerUpload";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), userController.getUsers);

router.get("/admin", auth(UserRole.ADMIN), userController.getUsers);
router.get("/vendor", auth(UserRole.ADMIN), userController.getVendors);
router.get("/customer", auth(UserRole.ADMIN), userController.getCustomers);

router.post(
  "/create-admin",
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return userController.createAdmin(req, res, next);
  }
);

router.post(
  "/create-vendor",
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return userController.createVendor(req, res, next);
  }
);

router.post(
  "/create-customer",
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return userController.createCustomer(req, res, next);
  }
);


router.patch(
  "/change-status/:userId",
  auth(UserRole.ADMIN),
  userController.updateStatus
);

export const userRoutes = router;
