import express from "express";
import { BrandController } from "./brand.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { multerUpload } from "../../../helpars/multerUpload";

const router = express.Router();

router.get(
  "/",
  // auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.VENDOR),
  BrandController.getBrands
);

router.get(
  "/:brandId",
  // auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.VENDOR),
  BrandController.getBrand
);

router.post(
  "/",
  // auth(UserRole.ADMIN),
  multerUpload.single("file"),
  BrandController.createBrand
);
router.patch(
  "/:brandId",
  // auth(UserRole.ADMIN),
  multerUpload.single("file"),
  BrandController.editBrand
);
router.delete(
  "/:brandId",
  // auth(UserRole.ADMIN),
  BrandController.deleteBrand
);

export const BrandRoutes = router;
