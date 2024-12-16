"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuponRoutes = void 0;
const express_1 = __importDefault(require("express"));
const shop_controller_1 = require("../Shop/shop.controller");
const router = express_1.default.Router();
router.post("/", shop_controller_1.ShopController.createShop);
exports.CuponRoutes = router;
