import { ProductSidebar } from "@/src/components/pageComponents/Products/ProductsSidebar";
import { getCategories } from "@/src/services/category/query";
import { getBrands } from "@/src/services/product/query";
import { ICategory } from "@/src/types/category";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: categoriesData } = await getCategories();
  const categories = categoriesData.map((category: ICategory) => category.name);
  const { data: brands } = await getBrands();
  return (
    <div className="min-h-screen mt-[120px] flex">
      {/* Sidebar */}
      <div className="w-[20%] bg-[#F7F7F7] shadow-md p-4 overflow-y-auto mb-10">
        <ProductSidebar categories={categories} brands={brands} />
      </div>

      {/* Content */}
      <div className="flex-grow p-4 w-[80%]">{children}</div>
    </div>
  );
}
