"use client";
import { useCreateCategory } from "@/src/hooks/category.hook";
import { Toast } from "@/src/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";

const CreateBrand = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm();
    const { mutate: handleCreateCategory, isSuccess: isCreateCategorySuccess, isLoading: isCreateCategoryLoading, isError, error } = useCreateCategory()
    console.log(error)
    const router = useRouter()

    const onSubmit = (data: FieldValues) => {
        // Create a new FormData object
        const formData = new FormData();

        // Append regular form data (brandName)
        formData.append("data", JSON.stringify({ name: data.name }));

        // Append the file (image)
        if (data.image && data.image[0]) {
            formData.append("file", data.image[0]);
        }

        // Handle form submission (you can now send formData to the server)
        handleCreateCategory(formData)

        // reset();
    };

    useEffect(() => {
        if (isCreateCategorySuccess) {
            Toast("success", "Created category successfully!")
            router.push("/dashboard/admin/category")
            reset();
        }
    }, [isCreateCategorySuccess])

    return (
        <div className="flex justify-center px-8 mt-10 bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg w-full">
                <div className=" mb-4 border-b py-4 flex items-center justify-between px-6">
                    <h2 className=" text-xl font-semibold text-start">Create Category</h2>
                    <Link href={"/dashboard/admin/category"} className="w-fit py-2 px-4 font-medium bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                        Manage Categories
                    </Link>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="space-y-4 p-6">
                        {/* Brand Name Input */}
                        <div>
                            <label
                                htmlFor="brandName"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register("name", { required: "Brand name is required" })}
                                placeholder="Enter brand name"
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.name
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                                    }`}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500 mt-1">
                                    {typeof errors.name.message === "string" &&
                                        errors.name.message}
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
                                {...register("image", { required: "Image is required" })}
                                className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${errors.image ? "border-red-500 focus:ring-red-500" : ""
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
                    <div className="py-4 border-t px-6">
                        <button
                            type="submit"
                            disabled={isCreateCategoryLoading}
                            className="w-fit py-2 px-4 font-medium bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            {isCreateCategoryLoading ? "Creating..." : "Create Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBrand;
