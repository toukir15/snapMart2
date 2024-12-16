import { Cart, CartItem } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createCart = async (
  payload: { cart: Cart; cartItem: CartItem },
  user: any
) => {
  return await prisma.$transaction(async (prisma) => {
    const findCustomer = await prisma.customer.findFirstOrThrow({
      where: {
        email: user.email,
      },
    });
    const customerId = findCustomer.id;
    const { shopId } = payload.cart;

    // Check if a cart already exists for the customer and shop
    const existingCart = await prisma.cart.findFirst({
      where: {
        shopId,
        customerId,
      },
    });

    // Initialize result as the existing cart or create a new one if not found
    let result: Cart;
    if (existingCart) {
      result = existingCart;
    } else {
      result = await prisma.cart.create({
        data: { ...payload.cart, customerId },
      });

      await prisma.customer.update({
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
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        productId: returnItem.productId,
        cartId: returnItem.cartId,
      },
    });

    if (existingCartItem) {
      // Update the quantity of the existing cart item
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + returnItem.quantity },
      });
    } else {
      // Create a new cart item
      await prisma.cartItem.create({
        data: returnItem,
      });
    }
    return result;
  });
};

const getCarts = async (user: any) => {
  const findCustomer = await prisma.customer.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });


  if (!findCustomer.cartId) {
    throw new Error("Customer does not have an associated cart.");
  }

  const findCart = await prisma.cart.findFirstOrThrow({
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

  const findCartItems = await prisma.cartItem.findMany({
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

  const result = { ...findCart, cartItems: findCartItems };
  return result;
};

export const CartServices = {
  createCart,
  getCarts,
};
