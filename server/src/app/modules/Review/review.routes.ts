import express from "express";
import { ReviewControllers } from "./review.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.CUSTOMER, UserRole.VENDOR, UserRole.ADMIN),
  ReviewControllers.getReviews
);
router.post("/", auth(UserRole.CUSTOMER), ReviewControllers.createReview);

// router.post("/", auth(UserRole.CUSTOMER), ReviewController.insertIntoDB);

export const ReviewRoutes = router;
