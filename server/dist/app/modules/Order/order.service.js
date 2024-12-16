"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = payload.cartId;
    const productId = payload.productId;
    // Check if the vendor already has a shop
    const existingCartItem = yield prisma_1.default.cartItem.findFirst({
        where: {
            cartId: cartId,
            productId: productId,
        },
    });
    if (existingCartItem) {
        throw new Error("Cart item already exist!");
    }
    const result = yield prisma_1.default.cartItem.create({
        data: payload,
    });
    return result;
});
exports.OrderServices = {
    createOrder,
};
