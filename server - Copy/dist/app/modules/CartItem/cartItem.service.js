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
exports.CartItemServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getCartItems = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const customerData = yield prisma_1.default.customer.findUnique({
        where: {
            email: payload.email,
        },
    });
    const findCustomerCart = yield prisma_1.default.cart.findFirst({
        where: {
            customerId: customerData === null || customerData === void 0 ? void 0 : customerData.id,
        },
    });
    const result = yield prisma_1.default.cartItem.findMany({
        where: { cartId: findCustomerCart === null || findCustomerCart === void 0 ? void 0 : findCustomerCart.id },
        include: {
            product: {
                select: { name: true, images: true, price: true, inventoryCount: true },
            },
        },
    });
    return result;
});
const updateCartItem = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the cart item by its unique ID
    console.log(payload);
    const findCartItem = yield prisma_1.default.cartItem.findFirstOrThrow({
        where: {
            id: payload.id,
        },
    });
    let result;
    // Increase or decrease the quantity
    if (payload.type === "increase") {
        result = yield prisma_1.default.cartItem.update({
            where: {
                id: payload.id,
            },
            data: {
                quantity: findCartItem.quantity + 1,
            },
        });
    }
    else if (payload.type === "decrease") {
        if (findCartItem.quantity > 1) {
            result = yield prisma_1.default.cartItem.update({
                where: {
                    id: payload.id,
                },
                data: {
                    quantity: findCartItem.quantity - 1,
                },
            });
        }
    }
    else if (payload.type === "delete") {
        result = yield prisma_1.default.cartItem.delete({
            where: {
                id: payload.id,
            },
        });
    }
    return result;
});
exports.CartItemServices = {
    getCartItems,
    updateCartItem,
};
