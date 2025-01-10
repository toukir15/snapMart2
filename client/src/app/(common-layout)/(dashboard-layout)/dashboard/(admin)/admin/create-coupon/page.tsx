"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

const CreateBrandPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: FieldValues) => {
        console.log("Form Data:", data);

        // Reset the form
        reset();
    };

    return (
        <div className="flex justify-center px-8 bg-gray-100 mt-10">
            <div className="bg-white rounded-lg shadow-md w-full">
                {/* Page Title and Manage Button */}
                <div className="flex justify-between items-center px-6 border-b py-4 mb-4">
                    <h1 className="text-xl font-bold text-gray-800">Create Coupon</h1>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                        Manage Coupons
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-2 gap-y-6 gap-x-6 px-6 pb-8"
                >
                    {/* Coupon Code */}
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-2">
                            Coupon Code
                        </label>
                        <input
                            type="text"
                            id="couponCode"
                            {...register("couponCode", {
                                required: "Coupon code is required",
                            })}
                            placeholder="Enter Coupon Code"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.couponCode && (
                            <p className="text-red-500 text-sm">{errors.couponCode.message}</p>
                        )}
                    </div>

                    {/* Discount Value */}
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 mb-2">
                            Discount Value (0-100)
                        </label>
                        <input
                            type="number"
                            id="discountValue"
                            {...register("discountValue", {
                                required: "Discount value is required",
                                min: { value: 0, message: "Value must be at least 0" },
                                max: { value: 100, message: "Value must not exceed 100" },
                            })}
                            placeholder="Enter Discount Value"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.discountValue && (
                            <p className="text-red-500 text-sm">{errors.discountValue.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            {...register("description")}
                            rows={1}
                            placeholder="Enter Description (Optional)"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    {/* Start Date */}
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            {...register("startDate", {
                                required: "Start date is required",
                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.startDate && (
                            <p className="text-red-500 text-sm">{errors.startDate.message}</p>
                        )}
                    </div>

                    {/* End Date */}
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            {...register("endDate", {
                                required: "End date is required",
                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                        {errors.endDate && (
                            <p className="text-red-500 text-sm">{errors.endDate.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 flex">
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
                        >
                            Create Coupon
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBrandPage;
