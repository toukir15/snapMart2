"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cartItem_controller_1 = require("./cartItem.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER), cartItem_controller_1.CartItemControllers.getCartItems);
router.patch("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER), cartItem_controller_1.CartItemControllers.updateCartItem);
exports.CartItemRoutes = router;
