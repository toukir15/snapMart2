"use client";

import { useEditCategory, useGetCategory } from "@/src/hooks/category.hook";
import { useEditCoupon, useGetCoupon } from "@/src/hooks/coupon.hook";
import { Toast } from "@/src/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

export const EditCouponForm = ({ id }: { id: string }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { data } = useGetCoupon(id);
    const couponData = data?.data.data
    const { mutate, isLoading, isSuccess, error } = useEditCoupon()
    const router = useRouter()

    const onSubmit = async (data: FieldValues) => {
        const formattedData = {
            ...data,
            discountValue: Number(data.discountValue),
            startDate: new Date(data.startDate).toISOString(),
            endDate: new Date(data.endDate).toISOString(),
        };
        mutate({ id: couponData.id, data: formattedData })
    };

    useEffect(() => {
        if (couponData) {
            reset({
                couponCode: couponData?.couponCode,
                discountValue: couponData?.discountValue,
                description: couponData?.description,
                startDate: couponData?.startDate?.split("T")[0] || "",
                endDate: couponData?.endDate?.split("T")[0] || "",
            });
        }
    }, [couponData, reset]);

    useEffect(() => {
        if (isSuccess) {
            Toast("error", "Somthing is wrong!")
            // router.push("/dashboard/admin/coupon")
        }
    }, [isSuccess])

    // useEffect(() => {
    //     if (error) {
    //         Toast("success", "Edited category successfully!")
    //         router.push("/dashboard/admin/coupon")
    //         reset();
    //     }
    // }, [error])

    return (
        <div className="flex justify-center px-8 bg-gray-100 mt-10">
            <div className="bg-white rounded-lg shadow-md w-full">
                {/* Page Title and Manage Button */}
                <div className="flex justify-between items-center px-6 border-b py-4">
                    <h1 className="text-xl font-bold text-gray-800">Edit Coupon</h1>
                    <Link href={"/dashboard/admin/coupon"} className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                        Manage Coupons
                    </Link>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-6 p-6">
                        {/* Coupon Code */}
                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="couponCode"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Coupon Code
                            </label>
                            <input
                                type="text"
                                id="couponCode"
                                defaultValue={couponData?.couponCode}
                                {...register("couponCode", {
                                    required: "Coupon code is required",
                                })}
                                placeholder="Enter Coupon Code"
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.couponCode
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                                    }`}
                            />
                            {errors.couponCode?.message && (
                                <p className="text-red-500 text-sm">
                                    {String(errors.couponCode.message)}
                                </p>
                            )}
                        </div>

                        {/* Discount Value */}
                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="discountValue"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Discount Value (0-100)
                            </label>
                            <input
                                type="number"
                                id="discountValue"
                                defaultValue={couponData?.discountValue}
                                {...register("discountValue", {
                                    required: "Discount value is required",
                                    min: { value: 0, message: "Value must be at least 0" },
                                    max: { value: 100, message: "Value must not exceed 100" },
                                })}
                                placeholder="Enter Discount Value"
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.discountValue
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                                    }`}
                            />
                            {errors.discountValue?.message && (
                                <p className="text-red-500 text-sm">
                                    {String(errors.discountValue.message)}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="col-span-2">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                defaultValue={couponData?.description}
                                {...register("description")}
                                rows={1}
                                placeholder="Enter Description (Optional)"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        {/* Start Date */}
                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="startDate"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                defaultValue={couponData?.startDate ? couponData?.startDate.split("T")[0] : ""}
                                {...register("startDate", {
                                    required: "Start date is required",
                                })}
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.startDate
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                                    }`}
                            />
                            {errors.startDate?.message && (
                                <p className="text-red-500 text-sm">
                                    {String(errors.startDate.message)}
                                </p>
                            )}
                        </div>

                        {/* End Date */}
                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="endDate"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                End Date
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                defaultValue={couponData?.endDate ? couponData?.endDate.split("T")[0] : ""}
                                {...register("endDate", {
                                    required: "End date is required",
                                })}
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.endDate
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                                    }`}
                            />
                            {errors.endDate?.message && (
                                <p className="text-red-500 text-sm">
                                    {String(errors.endDate.message)}
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Submit Button */}
                    <div className="border-t py-4 px-6">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-orange-500 font-medium text-white px-6 py-2 rounded-md hover:bg-orange-600"
                        >
                            {isLoading ? "Editing..." : "Edit Coupon"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

