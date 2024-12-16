"use client";
import { useCreateCart } from "@/src/hooks/cart.hook";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import PageLoading from "../../loading/PageLoading";
import { toast } from "sonner";

export default function ProductCounter({
  data,
}: {
  data: any;
}) {
  const [counter, setCounter] = useState(1);
  const { inventoryCount } = data
  const { mutate: handleCreateCart, isLoading, isSuccess } = useCreateCart()
  const handleAddToCart = (data: any) => {

    const addToCartData = {
      cart: {
        shopId: data.shopId
      },
      cartItem: {
        productId: data.id,
        quantity: counter
      }
    }
    handleCreateCart(addToCartData)
  }
  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Successfully added to the cart!", { duration: 2000 })
    }
  }, [isSuccess])

  return (
    <div>
      {isLoading && <PageLoading />}
      <div className="flex mt-4 lg:mt-12 gap-4 lg:gap-6">
        <div className="flex gap-4 border py-2 lg:py-2 justify-between px-4 lg:w-[30%] text-xl ">
          <button
            disabled={counter <= 1}
            onClick={() => setCounter(counter - 1)}
            className={`${counter <= 1
              ? "text-orange-200"
              : "text-orange-500 hover:text-orange-600"
              }  transition duration-100 pr-1`}
          >
            <FiMinus />
          </button>
          <p>{counter}</p>
          <button
            disabled={
              counter == inventoryCount || inventoryCount - counter === 0
            }
            onClick={() => setCounter(counter + 1)}
            className={` ${counter == inventoryCount || inventoryCount - counter === 0
              ? "text-orange-200"
              : "text-orange-500 hover:text-orange-600"
              }  transition duration-100 pl-1`}
          >
            <GoPlus />
          </button>
        </div>
        <Button
          size="lg"
          radius="none"
          onClick={() => handleAddToCart(data)}
          className="px-4 w-[50%] bg-orange-500 transition duration-150 text-white font-medium flex justify-center items-center"
        //   disabled={!selectedSize}s
        >
          Add to Cart
        </Button>
      </div>
      {/* {!selectedSize && (
        <p className="mt-2 text-sm text-red-500">Please select a size</p>
      )} */}
    </div>
  );
}
