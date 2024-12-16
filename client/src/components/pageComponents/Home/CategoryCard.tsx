"use client";
import {
    IProductProviderValues,
    ProductContext,
} from "@/src/context/product.provider";
import { ICategory } from "@/src/types/category";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

export default function CategoryCard({
    categoriesData,
}: {
    categoriesData: ICategory[];
}) {
    const { productStates } = useContext(
        ProductContext
    ) as IProductProviderValues;

    const { setCategory } = productStates;

    return (
        <div className="grid grid-cols-7 ">
            {categoriesData.map((category: ICategory) => {
                return (
                    <Link
                        href={"/products"}
                        onClick={() => setCategory(category.name)}
                        key={category.id}
                        className="w-[180px] border py-2 rounded hover:shadow-lg flex justify-center items-center transition text-center duration-200"
                    >
                        <div>
                            <div className="  md:h-[140px] w-[140] relative flex justify-center items-center">
                                <Image
                                    src={category.image}
                                    height={500}
                                    width={500}
                                    alt="banner 1"
                                    objectFit="cover"
                                    priority
                                />
                            </div>
                            <p className="text-sm">{category.name}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
