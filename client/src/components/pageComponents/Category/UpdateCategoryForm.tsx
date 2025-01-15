"use client";

import { useEditCategory, useGetCategory } from "@/src/hooks/category.hook";
import { Toast } from "@/src/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateCategoryForm = ({ id }: { id: string }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { data } = useGetCategory(id);
    console.log(data)
    const categoryData = data?.data.data
    const { mutate: handleEditCategory, isLoading, isSuccess } = useEditCategory()
    const router = useRouter()

    const onSubmit = async (data: FieldValues) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify({ name: data.name }));
        formData.append("file", data.image[0]);
        // console.log(data)
        // console.log(data.image[0])
        handleEditCategory({ id, data: formData })
    };

    useEffect(() => {
        if (isSuccess) {
            Toast("success", "Edited category successfully!")
            router.push("/dashboard/admin/category")
            reset();
        }
    }, [isSuccess])

    return (
        <div className="flex justify-center px-8 mt-10 bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg w-full">
                <div className=" mb-4 border-b py-4 flex items-center justify-between px-6">
                    <h2 className=" text-xl font-semibold text-start">Edit Category</h2>
                    <Link href={"/dashboard/admin/category"} className="w-fit py-2 px-4 font-medium bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                        Manage Categories
                    </Link>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="space-y-4 px-6 pb-6">
                        {/* Brand Name Input */}
                        <div>
                            <label
                                htmlFor="brandName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register("name", {
                                    required: "Category name is required",
                                })}
                                defaultValue={categoryData?.name}
                                placeholder="Enter brand name"
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.brandName
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                                    }`}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.name?.message as string}
                                </p>
                            )}
                        </div>

                        {/* Logo Input */}
                        <div>
                            <label
                                htmlFor="logo"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                {...register("image")}
                                className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${errors.logo
                                    ? "border-red-500 focus:ring-red-500"
                                    : ""
                                    }`}
                            />
                            {errors.image && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.image?.message as string}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="border-t py-4 px-6">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-fit py-2 px-4 font-medium bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            {isLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCategoryForm;
