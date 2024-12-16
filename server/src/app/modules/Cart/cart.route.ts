import express from "express";
import { CartControllers } from "./cart.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), CartControllers.createCart);
router.get("/", auth(UserRole.CUSTOMER), CartControllers.getCarts);
router.get("/cart-count", CartControllers.getCarts);

export const CartRoutes = router;
