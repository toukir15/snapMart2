import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { multerUpload } from "../../../helpars/multerUpload";

const router = express.Router();

router.get(
  "/",
  // auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.VENDOR),
  CategoryController.getCategories
);

router.post(
  "/",
  auth(UserRole.ADMIN),
  multerUpload.single("file"),
  CategoryController.createCategory
);
router.patch(
  "/:categoryId",
  auth(UserRole.ADMIN),
  CategoryController.editCategory
);
router.delete(
  "/:categoryId",
  auth(UserRole.ADMIN),
  CategoryController.deleteCategory
);

export const CategoryRoutes = router;
