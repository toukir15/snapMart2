import { IProduct } from "@/src/types/product";
import { calculateDiscounnt } from "@/src/utils/calculateDiscount";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductSuggestion({
  productSuggestedData,
}: {
  productSuggestedData: IProduct[];
}) {
  return (
    <div>
      <h3 className="text-xl font-medium mt-8">You may also like</h3>
      <div className="flex gap-4 mt-4 mb-10">
        {productSuggestedData.map((product: IProduct) => {
          const tumbnail = product?.images[0];
          const dicountPrice = calculateDiscounnt(
            product.price,
            product.discount
          );
          return (
            <Link
              href={`/product-details/${product.id}`}
              key={product.id}
              className="w-[220px] border p-2 rounded hover:shadow-lg bg-[#F7F7F7] transition duration-200"
            >
              <div className="  md:h-[200px] relative flex justify-center items-center">
                <Image
                  src={tumbnail}
                  width={500}
                  height={500}
                  alt="banner 1"
                  objectFit="cover"
                  priority
                />
              </div>
              <p className="text-sm">{product.name}</p>
              <p className="flex gap-2 items-center mt-1 ">
                <span className="text-[#F85606]">৳{dicountPrice}</span>
                <span className="text-xs text-gray-500">
                  -{product.discount}%
                </span>
              </p>
              <div className="flex items-center gap-1 text-xs">
                <Rating
                  className="mt-1"
                  style={{ maxWidth: 70 }}
                  value={product.rating}
                  readOnly
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
