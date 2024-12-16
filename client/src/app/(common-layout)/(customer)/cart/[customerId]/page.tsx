"use client";

import CartItemLoading from "@/src/components/loading/CartItemLoading";
import { CartHeader } from "@/src/components/pageComponents/Cart/CartHeader";
import { CartItem } from "@/src/components/pageComponents/Cart/CartItem";
import { OrderSummary } from "@/src/components/pageComponents/Cart/OrderSummery";
import { useGetCart } from "@/src/hooks/cart.hook";
import { IProduct } from "@/src/types/product";
import React from "react";

const CartPage = () => {
  const { data, isLoading } = useGetCart();
  const cartData = data?.data.data
  const totalPrice = cartData?.cartItems?.reduce(
    (acc: number, item: any) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-6 pt-[180px] min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="border border-gray-200 rounded-lg mb-6">
            <CartHeader shopName={cartData?.shop?.name} totalPrice={totalPrice} />
            <div className="p-4">
              {isLoading && <CartItemLoading />}
              {cartData?.cartItems?.map((product: IProduct) => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        <OrderSummary
          subtotal={totalPrice}
          shippingFee={80}
          total={totalPrice + 80}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CartPage;
