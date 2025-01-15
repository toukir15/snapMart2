"use client";

import { CustomTable } from "@/src/components/shared/table/table";
import { brandColumns, categoriesColumn, shopsColumns } from "@/src/components/shared/table/table.const";
import { useDeleteBrand, useGetBrands } from "@/src/hooks/brand.hook";
import { useGetCategories } from "@/src/hooks/category.hook";
import { showConfirmation } from "@/src/utils/showConfirmation";
import { Toast } from "@/src/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
    const { data: categoriesData, isLoading: isCategoriesDataLoaing } = useGetCategories()
    const { mutate: handleDeleteBrand, isSuccess: isDeleteBrandSuccess } = useDeleteBrand()
    const router = useRouter()

    const handleEdit = (id: string) => {
        router.push(`/dashboard/admin/category/update-category/${id}`)
    };

    const handleDelete = (id: string) => {
        showConfirmation(
            "Delete Category",
            "Are you sure you want to delete this category?",
            () => handleDeleteBrand(id)
        );
    };

    const actions = [
        {
            label: "Edit",
            onClick: handleEdit,
            className:
                "bg-green-500 hover:bg-green-600 transition duration-150 py-1 px-3 rounded text-white",
            disabled: (record: any) => record.isActive === false,
        },
        {
            label: "Delete",
            onClick: handleDelete,
            className:
                "bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white",
            disabled: (record: any) => record.isActive === true,
        },
    ];

    useEffect(() => {
        if (isDeleteBrandSuccess) {
            Toast("success", "Deleted category successfully!")
        }
    }, [isDeleteBrandSuccess]);

    return (
        <>
            <div className="xl:px-4 lg:px-32 mt-8 lg:mt-20 rounded-lg bg-white">
                <div className="py-6 flex justify-end">
                    <Link href={"/dashboard/admin/category/create-category"} className="w-fit py-2 px-4 font-medium bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">Create Category</Link>
                </div>
                <CustomTable
                    columns={categoriesColumn}
                    data={categoriesData?.data?.data || []}
                    loading={isCategoriesDataLoaing}
                    actions={actions}
                    pageSize={12}
                />
            </div>
        </>
    );
}
