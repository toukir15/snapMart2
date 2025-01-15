import express from "express";
import { CouponControllers } from "./cupon.controller";

const router = express.Router();

router.get("/", CouponControllers.getCoupons);
router.get(`/:couponId`, CouponControllers.getCoupon);
router.post("/", CouponControllers.createCupon);
router.patch("/:couponId", CouponControllers.editCoupon);
router.delete("/:couponId", CouponControllers.deleteCoupon);

export const CuponRoutes = router;
