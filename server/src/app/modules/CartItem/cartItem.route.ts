import express from "express";
import { CartItemControllers } from "./cartItem.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", CartItemControllers.getCartItems);
router.get("/cart-count", CartItemControllers.getAddToCartCount);
router.patch("/", CartItemControllers.updateCartItem);

export const CartItemRoutes = router;
