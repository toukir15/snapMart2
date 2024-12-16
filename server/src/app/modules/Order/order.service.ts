import { CartItem } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createOrder = async (payload: CartItem) => {
  const cartId = payload.cartId;
  const productId = payload.productId;

  // Check if the vendor already has a shop
  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cartId,
      productId: productId,
    },
  });

  if (existingCartItem) {
    throw new Error("Cart item already exist!");
  }
  const result = await prisma.cartItem.create({
    data: payload,
  });
  return result;
};

export const OrderServices = {
  createOrder,
};
