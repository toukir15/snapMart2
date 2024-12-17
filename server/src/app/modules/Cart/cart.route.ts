import express from "express";
import { CartControllers } from "./cart.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", CartControllers.createCart);
router.get("/", CartControllers.getCarts);
router.get("/cart-count", CartControllers.getCarts);

export const CartRoutes = router;
