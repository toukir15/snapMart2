import React from "react";
import { FaHeart } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { getProducts } from "@/src/services/product/query";
import { IProduct } from "@/src/types/product";
import { getShop } from "@/src/services/shop/query";
import Link from "next/link";

const ShopPage = async ({ params }: any) => {
  const { shopId } = await params
  const { data: shopData } = await getShop(shopId)
  const { data: productsData } = await getProducts(shopId)

  return (
    <div className="container mx-auto px-6 pt-[120px] min-h-screen ">
      {/* Shop Header */}
      <div className="flex items-center justify-between bg-[#F7F7F7] p-4 border border-b-0">
        <div className="flex items-center gap-4">
          <div className="flex justify-center">
            <div className="relative flex justify-center rounded-full overflow-hidden w-20 h-20 md:w-20 md:h-20">
              <Image
                src={shopData.logo}
                fill
                className="object-cover"
                alt="User Profile"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{shopData.name}</h1>
            <p className="text-base text-gray-600 mt-1">
              {shopData.description}
            </p>
          </div>
        </div>
        <div>
          <div className="ml-auto flex items-center gap-3">
            <FaHeart className="text-orange-500" size={22} />
            <span className="text-lg font-semibold text-gray-700">1,234 Followers</span>
          </div>
          {/* Shop Actions */}
          <div className="mt-6 flex justify-center gap-3">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium shadow-md transition"
            >
              <Link href={`/vendor/edit-shop/${shopData.id}`} >Edit Shop</Link>
            </Button>
            <Button
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium shadow-md transition"
            >
              Reviews
            </Button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div>
        <div className="flex flex-wrap mb-10">
          {productsData.map((product: IProduct, index: number) => (
            <div
              key={index}
              className={`bg-white border w-[205px] border-gray-200 p-4 shadow-sm hover:shadow-lg transition duration-300 ${(index + 1) % 6 === 0 ? "border-r" : "border-r-0"
                }`}
            >
              <div className="relative flex justify-center items-center h-[180px] bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-[#F85606]">{product.price}</span>
                  <span className="text-xs font-medium text-gray-500 line-through">
                    {product.discount}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <Rating
                    style={{ maxWidth: 80 }}
                    value={product.rating}
                    readOnly
                  />
                  <span className="text-xs text-gray-500">({product.rating})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mb-16">
          {productsData.length > 16 && <Button className="px-8 border border-[#F85606] text-[#F85606] bg-white ">
            Show All Products
          </Button>}
        </div>
      </div>
      <h1 className="text-center text-2xl text-gray-500">You do not added any product yet!</h1>
      <h1 className="text-center mt-2 text-gray-500">Click here to <Link className="underline hover:text-[#ff8548e7] text-[#F85606]" href={"/vendor/create-product"}>create product</Link></h1>
    </div>
  );
};

export default ShopPage;
