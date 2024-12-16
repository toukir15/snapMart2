import express from "express";
import { ShopController } from "../Shop/shop.controller";

const router = express.Router();

router.post("/", ShopController.createShop);

export const CuponRoutes = router;
