import React from "react";
import { FaHeart } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import flash3 from "../../../../../../public/flashSale/flash2.png";
import { Button } from "@nextui-org/button";

const ShopPage = () => {
  const products = Array(10).fill({
    id: 1,
    name: "Jordan 4 Retro Mid Military Black",
    image: flash3,
    price: "৳1,000",
    discount: "-17%",
    rating: 3,
  });

  return (
    <div className="container mx-auto p-6 mt-[120px]">
      <div className="flex items-center gap-4">
        <img
          src="https://via.placeholder.com/100"
          alt="Shop Logo"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-semibold">Jordan's Shoes</h1>
          <p className="text-sm text-gray-600">
            High-quality shoes for every occasion.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <FaHeart className="text-orange-500" size={20} />
          <span className="text-gray-700">1234 Followers</span>
        </div>
      </div>

      {/* Shop Actions */}
      <div className="mt-4 flex gap-4">
        <Button className="px-4 py-2 bg-green-600 text-white rounded ">
          Shop Edit
        </Button>
        <Button className="px-4 py-2 bg-orange-600 text-white rounded">
          Reviews
        </Button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-5 gap-4 mt-10">
        {products.map((product, index) => (
          <div
            key={index}
            className="w-[220px] border p-2 rounded hover:shadow-lg bg-[#F7F7F7] transition duration-200"
          >
            <div className="md:h-[200px] relative flex justify-center items-center">
              <Image
                src={product.image}
                alt={product.name}
                objectFit="cover"
                priority
              />
            </div>
            <p className="text-sm">{product.name}</p>
            <p className="flex gap-2 items-center mt-1">
              <span className="text-[#F85606]">{product.price}</span>
              <span className="text-xs text-gray-500">{product.discount}</span>
            </p>
            <div className="flex items-center gap-1 text-xs">
              <Rating
                className="mt-1"
                style={{ maxWidth: 70 }}
                value={product.rating}
                readOnly
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
