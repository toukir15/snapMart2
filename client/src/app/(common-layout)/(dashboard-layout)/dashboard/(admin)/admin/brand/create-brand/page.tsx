"use client";
import { useCreateBrand } from "@/src/hooks/brand.hook";
import { Toast } from "@/src/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

const CreateBrand = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { mutate: handleCreateBrand, isSuccess: isCreateBrandSuccess, isLoading: isCreateBrandLoading } = useCreateBrand()
    const router = useRouter()

    const onSubmit = async (data: FieldValues) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify({ name: data.brandName }));
        formData.append("file", data.logo[0]);
        handleCreateBrand(formData)
    };

    useEffect(() => {
        if (isCreateBrandSuccess) {
            Toast("success", "Created brand successfully!")
            reset()
            router.push("/dashboard/admin/brand")
        }
    }, [isCreateBrandSuccess])

    return (
        <div className="flex justify-center px-8 mt-10 bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg w-full">
                <div className=" mb-4 border-b py-4 flex items-center justify-between px-6">
                    <h2 className=" text-xl font-semibold text-start">Create Brand</h2>
                    <Link href={"/dashboard/admin/brand/create-brand"} className="w-fit py-2 px-4 font-medium bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                        Manage Brands
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
                                Brand Name
                            </label>
                            <input
                                type="text"
                                id="brandName"
                                {...register("brandName", { required: "Brand name is required" })}
                                placeholder="Enter brand name"
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.brandName
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                                    }`}
                            />
                            {errors.brandName && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.brandName?.message as string}
                                </p>
                            )}
                        </div>

                        {/* Logo Input */}
                        <div>
                            <label
                                htmlFor="logo"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Brand Logo
                            </label>
                            <input
                                type="file"
                                id="logo"
                                accept="image/*"
                                {...register("logo", { required: "Logo is required" })}
                                className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${errors.logo ? "border-red-500 focus:ring-red-500" : ""
                                    }`}
                            />
                            {errors.logo && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.logo?.message as string}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="border-t py-4 px-6">
                        <button
                            disabled={isCreateBrandLoading}
                            type="submit"
                            className="w-fit font-medium py-2 px-4 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            {isCreateBrandLoading ? "Creating..." : "Create Brand"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBrand;
