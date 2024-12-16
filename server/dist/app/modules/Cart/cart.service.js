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
exports.CartServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createCart = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const findCustomer = yield prisma.customer.findFirstOrThrow({
            where: {
                email: user.email,
            },
        });
        const customerId = findCustomer.id;
        const { shopId } = payload.cart;
        // Check if a cart already exists for the customer and shop
        const existingCart = yield prisma.cart.findFirst({
            where: {
                shopId,
                customerId,
            },
        });
        // Initialize result as the existing cart or create a new one if not found
        let result;
        if (existingCart) {
            result = existingCart;
        }
        else {
            result = yield prisma.cart.create({
                data: Object.assign(Object.assign({}, payload.cart), { customerId }),
            });
            yield prisma.customer.update({
                where: {
                    id: customerId,
                },
                data: {
                    cartId: result.id,
                },
            });
        }
        const returnItem = {
            productId: payload.cartItem.productId,
            quantity: payload.cartItem.quantity,
            cartId: result.id,
        };
        // Check if the cart item already exists
        const existingCartItem = yield prisma.cartItem.findFirst({
            where: {
                productId: returnItem.productId,
                cartId: returnItem.cartId,
            },
        });
        if (existingCartItem) {
            // Update the quantity of the existing cart item
            yield prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + returnItem.quantity },
            });
        }
        else {
            // Create a new cart item
            yield prisma.cartItem.create({
                data: returnItem,
            });
        }
        return result;
    }));
});
const getCarts = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const findCustomer = yield prisma_1.default.customer.findFirstOrThrow({
        where: {
            email: user.email,
        },
    });
    if (!findCustomer.cartId) {
        throw new Error("Customer does not have an associated cart.");
    }
    const findCart = yield prisma_1.default.cart.findFirstOrThrow({
        where: {
            id: findCustomer.cartId,
        },
        include: {
            shop: {
                select: {
                    name: true,
                },
            },
        },
    });
    const findCartItems = yield prisma_1.default.cartItem.findMany({
        where: {
            cartId: findCart.id,
        },
        include: {
            product: {
                select: {
                    name: true,
                    images: true,
                    price: true,
                    inventoryCount: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const result = Object.assign(Object.assign({}, findCart), { cartItems: findCartItems });
    return result;
});
exports.CartServices = {
    createCart,
    getCarts,
};
