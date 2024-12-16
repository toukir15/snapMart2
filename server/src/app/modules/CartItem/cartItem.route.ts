import express from "express";
import { CartItemControllers } from "./cartItem.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", auth(UserRole.CUSTOMER), CartItemControllers.getCartItems);
router.get("/cart-count", auth(UserRole.CUSTOMER), CartItemControllers.getAddToCartCount);
router.patch("/", auth(UserRole.CUSTOMER), CartItemControllers.updateCartItem);

export const CartItemRoutes = router;
