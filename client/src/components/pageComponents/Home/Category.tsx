import React from "react";
import { getCategories } from "@/src/services/category/query";
import CategoryCard from "./CategoryCard";

export default async function Category() {
    const { data: categoriesData } = await getCategories();
    return (
        <div className="mt-12">
            <h3 className="text-2xl ">Categories</h3>
            <div className="bg-[#F7F7F7]  mt-3 rounded">
                <CategoryCard categoriesData={categoriesData} />
            </div>
        </div>
    );
}
