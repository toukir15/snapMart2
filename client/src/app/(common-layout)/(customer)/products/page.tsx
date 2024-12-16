"use client";

import {
  IProductProviderValues,
  ProductContext,
} from "@/src/context/product.provider";
import { useGetProducts } from "@/src/hooks/product.hook";
import { IProduct } from "@/src/types/product";
import { calculateDiscounnt } from "@/src/utils/calculateDiscount";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useContext, useEffect, useState } from "react";

export default function Page() {
  const { productStates } = useContext(
    ProductContext
  ) as IProductProviderValues;

  // Destructuring values from productStates
  const {
    brand,
    category,
    searchTerm,
    minPrice,
    maxPrice,
    productPage,
    setProductPage,
  } = productStates;

  // Fetching products using the custom hook
  const { data } = useGetProducts({
    brand,
    category,
    searchTerm,
    minPrice,
    maxPrice,
    productPage,
  });

  // Extracting product data from API response
  const productsData = data?.data.data;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {/* Products Grid */}
        <div className="flex flex-wrap mt-4 ml-4">
          {productsData?.map((product: IProduct) => {
            const { id, name, price, discount, images } = product;
            const discountPrice = calculateDiscounnt(price, discount);

            return (
              <Link
                href={`/product-details/${id}`}
                key={id}
                className="w-[220px] border p-2 rounded hover:shadow-lg transition duration-200"
              >
                <div className="md:h-[200px] relative flex justify-center items-center">
                  <Image
                    src={images[0]}
                    alt={name}
                    width={500}
                    height={500}
                    objectFit="cover"
                    priority
                  />
                </div>
                <p className="text-sm">{name}</p>
                <p className="flex items-center text-[#F85606]">
                  ৳{discountPrice}
                </p>
                <div className="flex items-center gap-1 text-xs">
                  <p className="flex items-center line-through text-[#9a9a9a]">
                    ৳{price}
                  </p>
                  <p>-{discount}%</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load More Button */}
        {productsData?.length > 11 && (
          <div className="flex justify-center items-center mt-8 pb-20">
            <Button
              onClick={() => setProductPage(productPage + 1)}
              radius="none"
              className="px-20 bg-[#F85606] text-white"
            >
              Load More
            </Button>
          </div>
        )}
      </Suspense>
    </>
  );
}
