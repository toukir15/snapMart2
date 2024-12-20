"use client";

import { CustomTable } from "@/src/components/shared/table/table";
import { productColumns } from "@/src/components/shared/table/table.const";
import { useDeleteProduct, useGetVendorProducts } from "@/src/hooks/product.hook";
import { showConfirmation } from "@/src/utils/showConfirmation";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const { data: productsData, isLoading: isProductDataLoading } = useGetVendorProducts();
  const router = useRouter()

  // Action handlers
  const handleEdit = (id: string) => {
    router.push(`/vendor/edit-product/${id}`)
  };

  const handleDuplicate = (id: string) => {
    router.push(`/vendor/duplicate-product/${id}`)
  };

  const { mutate: handleDeleteProduct, } = useDeleteProduct()
  const handleDelete = (id: string) => {
    showConfirmation(
      "Delete",
      "Are you want to delete this product",
      () => handleDeleteProduct(id)
    )

  };

  // Define table actions
  const actions = [
    {
      label: "Duplicate",
      onClick: handleDuplicate,
      className:
        "bg-indigo-500 hover:bg-indigo-600 transition duration-150 py-1 px-3 rounded text-white",
    },
    {
      label: "Edit",
      onClick: handleEdit,
      className:
        "bg-green-500 hover:bg-green-600 transition duration-150 py-1 px-3 rounded text-white",
    },
    {
      label: "Delete",
      onClick: handleDelete,
      className:
        "bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white",
    },
  ];

  return (
    <div className="xl:px-4 lg:px-32 mt-8 lg:mt-20">
      <CustomTable
        columns={productColumns}
        data={productsData?.data?.data || []}
        actions={actions}
        loading={isProductDataLoading}
        pageSize={10}
      />
    </div>
  );
}
