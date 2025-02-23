"use client";
import React, { useEffect, useState } from "react";
import { Trash2, Copy, Edit } from "lucide-react";
import ReusableTable from "@/src/components/shared/table/CustomTable";
import CreateCategoryForm from "@/src/components/pageComponents/Category/CreateCategoryForm";
import { useDeleteCategory, useGetCategories } from "@/src/hooks/category.hook";
import { formatDate } from "@/src/utils/formatDate";
import UpdateCategoryForm from "@/src/components/pageComponents/Category/UpdateCategoryForm";
import { Toast } from "@/src/utils/toast";
export type TCategory = {
    id: string;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
};

const ProductManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(null);
    const { data: categoriesData } = useGetCategories()
    const { mutate, isSuccess: isDeleteSuccess } = useDeleteCategory()
    const modifyCategoryData = categoriesData?.data.data.map((category: TCategory) => {
        const formatCreatedAt = formatDate(category.createdAt)
        const formatUpdatedAt = formatDate(category.updatedAt)
        return {
            id: category.id,
            name: category.name,
            createdAt: formatCreatedAt,
            updatedAt: formatUpdatedAt,
            image: category.image
        }
    })


    const columns = [
        { header: "Image", key: "image" as const },
        { header: "Category Name", key: "name" as const },
        { header: "Created At", key: "createdAt" as const },
        { header: "Updated At", key: "updatedAt" as const },
    ];

    const onCreate = () => {
        setIsModalOpen(true)
    };

    const handleEdit = (item: TCategory) => {
        setSelectedCategory(item);
        setIsEditModalOpen(true);
    };

    const handleDelete = (item: TCategory) => {
        mutate(item.id)
    }

    const actions = [
        {
            label: "Delete",
            icon: <Trash2 size={16} className="mr-2" />,
            onClick: handleDelete,
        },
        {
            label: "Edit",
            icon: <Edit size={16} className="mr-2" />,
            onClick: handleEdit,
        },
    ];

    useEffect(() => {
        if (isDeleteSuccess) {
            Toast("success", "Delete category successfully!")
        }
    }, [isDeleteSuccess])

    return (
        <div>
            <ReusableTable title="Categories" data={modifyCategoryData} columns={columns} actions={actions} onCreate={onCreate} />

            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-[800px]">
                        <CreateCategoryForm setIsModalOpen={setIsModalOpen} />
                    </div>
                </div>
            )}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-[800px]">
                        <UpdateCategoryForm setIsModalOpen={setIsEditModalOpen} selectedCategory={selectedCategory} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;
