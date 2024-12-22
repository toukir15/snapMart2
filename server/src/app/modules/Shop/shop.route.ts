import express, { NextFunction, Request, Response } from "express";
import { multerUpload } from "../../../helpars/multerUpload";
import { ShopController } from "./shop.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), ShopController.getShops);
router.get("/:shopId", ShopController.getShop);
router.get("/blackList", auth(UserRole.CUSTOMER), ShopController.blackListShop);
router.post(
  "/",
  auth(UserRole.VENDOR),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return ShopController.createShop(req, res, next);
  }
);

router.patch(
  "/:shopId",
  auth(UserRole.VENDOR),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return ShopController.editShop(req, res, next);
  }
);

router.patch(
  "/black-list/:shopId",
  auth(UserRole.ADMIN),
  ShopController.blackListShop
);

export const ShopRoutes = router;
