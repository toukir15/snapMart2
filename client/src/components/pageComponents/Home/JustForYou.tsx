import React from "react";
import flash3 from "../../../../public/flashSale/flash3.webp";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import { Button } from "@nextui-org/button";
import { useGetProducts } from "@/src/hooks/product.hook";
import { getProducts } from "@/src/services/product/query";

export default async function JustForYou() {
    const { data } = await getProducts();
    return (
        <div className="my-12">
            <h3 className="text-2xl ">Just For You</h3>
            <div className="  mt-3 rounded">
                <div className="grid grid-cols-5 gap-4 ">
                    <div className="w-[220px] border p-2 rounded hover:shadow-lg bg-[#F7F7F7] transition duration-200">
                        <div className="  md:h-[200px] relative flex justify-center items-center">
                            <Image src={flash3} alt="banner 1" objectFit="cover" priority />
                        </div>
                        <p className="text-sm">
                            Jordan 4 Retro Mid Military Black Mid Military Black
                        </p>
                        <p className="flex gap-2 items-center mt-1 ">
                            <span className="text-[#F85606]">৳1,000</span>
                            <span className="text-xs text-gray-500">-17%</span>
                        </p>
                        <div className="flex items-center gap-1 text-xs">
                            <Rating
                                className="mt-1"
                                style={{ maxWidth: 70 }}
                                value={3}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-12">
                    <Button className="px-8 border border-[#F85606] text-[#F85606] bg-white ">
                        Show All Products
                    </Button>
                </div>
            </div>
        </div>
    );
}
