"use client";
import {
  IProductProviderValues,
  ProductContext,
} from "@/src/context/product.provider";
import { Button } from "@nextui-org/button";
import { useContext } from "react";

export const PriceFilter = () => {
  const { productStates } = useContext(
    ProductContext
  ) as IProductProviderValues;
  const { setMinPrice, setMaxPrice } = productStates;

  const handlePrice = (e: any) => {
    e.preventDefault();
    const min = e.target.min.value;
    const max = e.target.max.value;
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="mb-4">
      {/* Header */}
      <div className="flex justify-between items-center cursor-pointer p-2 bg-gray-100 rounded">
        <span className="text-gray-700 font-medium">Price</span>
      </div>

      {/* Price Range */}
      <form onSubmit={handlePrice} className="mt-2 pl-2">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            name="min" // "name" is important for accessing the value in "handlePrice"
            className="w-full p-2 border rounded text-sm"
            placeholder="Min"
            defaultValue={0}
          />
          <span>-</span>
          <input
            type="number"
            name="max" // "name" is important for accessing the value in "handlePrice"
            className="w-full p-2 border rounded text-sm"
            placeholder="Max"
            defaultValue={1000}
          />
        </div>
        <Button
          type="submit" // Ensure this button submits the form
          size="sm"
          className="mt-2 w-full bg-[#F85606] text-white py-1 rounded"
        >
          Apply
        </Button>
      </form>
    </div>
  );
};
