import React from "react";
import { Button } from "@nextui-org/button";
import { getFlashSaleProducts } from "@/src/services/product/query";
import Link from "next/link";
import { calculateDiscounnt } from "@/src/utils/calculateDiscount";
import Image from "next/image";

export default async function FlashSale() {
    const { data } = await getFlashSaleProducts();
    console.log(data)
    return (
        <div className="mt-12">
            <h3 className="text-2xl ">Flash Sale</h3>
            <div className="bg-[#F7F7F7] px-4 pb-4 mt-3 rounded">
                <div className="flex justify-between items-center py-4">
                    <p className="text-sm text-[#F85606]">On Sell Now</p>
                    <Link href={"/products"}>
                        <Button className="bg-[#F7F7F7] border border-[#F85606] text-[#F85606] ">
                            Shop All Product
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-6 ">
                    {data?.slice(0, 6).map((product: any) => {
                        const { name, price, discount, images } = product;
                        const dicountPrice = calculateDiscounnt(price, discount);
                        return (
                            <Link
                                key={product.id}
                                href={`/product-details/${product.id}`}
                                className="w-[210px] border p-4 rounded hover:shadow-lg transition duration-200"
                            >
                                <div className="  md:h-[200px] w-[200px] relative flex items-center">
                                    <Image
                                        src={images[0]}
                                        alt="banner 1"
                                        width={180}
                                        height={180}
                                        objectFit="cover"
                                        priority
                                    />
                                </div>
                                <p className="text-sm">{name}</p>
                                <p className="flex items-center text-[#F85606]">
                                    ৳{dicountPrice}
                                </p>
                                <div className="flex items-center gap-1 text-xs">
                                    <p className="flex items-center  line-through text-[#9a9a9a]">
                                        ৳{price}
                                    </p>
                                    <p>-{discount}%</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
