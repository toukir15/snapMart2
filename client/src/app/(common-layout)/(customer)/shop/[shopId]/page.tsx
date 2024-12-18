import React from "react";
import { FaHeart } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import flash3 from "../../../../../../public/flashSale/flash2.png";
import { Button } from "@nextui-org/button";

const ShopPage = () => {
  const products = Array(12).fill({
    id: 1,
    name: "Jordan 4 Retro Mid Military Black",
    image: flash3,
    price: "৳1,000",
    discount: "-17%",
    rating: 3,
  });

  return (
    <div className="container mx-auto px-6 mt-[120px] ">
      {/* Shop Header */}
      <div className="flex items-center justify-between bg-[#F7F7F7] p-6 border ">
        <div className="flex items-center gap-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Shop Logo"
            className="w-20 h-20 rounded-full border border-gray-300"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Jordan's Shoes</h1>
            <p className="text-base text-gray-600 mt-1">
              High-quality shoes for every occasion.
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
              Edit Shop
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
      <div className="flex flex-wrap mb-20">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white border w-[205px]  border-gray-200 p-4  shadow-sm hover:shadow-lg transition duration-300"
          >
            <div className="relative flex justify-center items-center h-[180px] bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.image}
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
    </div>
  );
};

export default ShopPage;
