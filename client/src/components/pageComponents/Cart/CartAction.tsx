"use client";
import { useUpdateCartItem } from "@/src/hooks/cartItem.hook";
import React from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import PageLoading from "../../loading/PageLoading";

export default function CartAction({ quantity, inventoryCount, productId }: any) {
  const { mutate: handleCartItemUpdate, isLoading } = useUpdateCartItem();
  const handleIncrease = (id: string) => {
    handleCartItemUpdate({ type: "increase", id });
  };
  const handleDecrease = (id: string) => {
    handleCartItemUpdate({ type: "decrease", id });
  };
  const handleDelete = (id: string) => {
    handleCartItemUpdate({ type: "delete", id });
  };

  return (
    <div>
      {
        isLoading && <PageLoading />
      }
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleDecrease(productId)}
          className="p-2 border rounded-md text-gray-700 hover:text-orange-500"
        >
          <FiMinus />
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => handleIncrease(productId)}
          className="p-2 border rounded-md text-gray-700 hover:text-orange-500"
        >
          <FiPlus />
        </button>
        <button
          className="p-2 text-red-500 hover:text-red-600 transition"
          onClick={() => handleDelete(productId)}
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}
