"use client";

import PageLoading from "@/src/components/loading/PageLoading";
import { CustomTable } from "@/src/components/shared/table/table";
import { productColumns } from "@/src/components/shared/table/table.const";
import { IProductProviderValues, ProductContext } from "@/src/context/product.provider";
import { useDeleteProduct, useGetProducts, useGetVendorProducts } from "@/src/hooks/product.hook";
import { showConfirmation } from "@/src/utils/showConfirmation";
import React, { useContext, useEffect } from "react";
import { toast } from "sonner";

export default function AdminDashboardProductPage() {
    const { productStates } = useContext(ProductContext) as IProductProviderValues
    const { brand, category, maxPrice, minPrice, searchTerm, } = productStates
    const { data: productsData, isLoading: isProductDataLoading } = useGetProducts({ brand, category, maxPrice, minPrice, searchTerm });
    const { mutate: handleDeleteProduct, isLoading: isDeleteDataLoading, isSuccess: isDeleteDataSuccess } = useDeleteProduct()
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
            label: "Delete",
            onClick: handleDelete,
            className:
                "bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white",
        },
    ];

    useEffect(() => {
        if (isDeleteDataSuccess) {
            toast.success("Product deleted successfully!")
        }
    }, [isDeleteDataSuccess])

    return (
        <>
            {isDeleteDataLoading && <PageLoading />}
            <div className="xl:px-4 lg:px-32 mt-8 lg:mt-20">
                <CustomTable
                    columns={productColumns}
                    data={productsData?.data?.data || []}
                    actions={actions}
                    loading={isProductDataLoading}
                    pageSize={12}
                />
            </div>
        </>
    );
}
