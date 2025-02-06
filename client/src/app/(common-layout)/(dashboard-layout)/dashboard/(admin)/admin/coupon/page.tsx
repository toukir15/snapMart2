"use client";

import { CustomTable } from "@/src/components/shared/table/table";
import { couponColumns } from "@/src/components/shared/table/table.const";
import { useDeleteCoupon, useGetCoupons } from "@/src/hooks/coupon.hook";
import { showConfirmation } from "@/src/utils/showConfirmation";
import { Toast } from "@/src/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
    const { data: couponData, isLoading: isCouponDataLoading } = useGetCoupons()
    const { mutate: handleDeleteCoupon, isSuccess: isDeleteCouponSuccess } = useDeleteCoupon()
    const router = useRouter()

    const handleEdit = (id: string) => {
        router.push(`/dashboard/admin/coupon/edit-coupon/${id}`)
    };

    const handleDelete = (id: string) => {
        showConfirmation(
            "Delete Coupon",
            "Are you sure you want to delete this coupon?",
            () => handleDeleteCoupon(id)
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
        if (isDeleteCouponSuccess) {
            Toast("success", "Deleted coupon successfully!")
        }
    }, [isDeleteCouponSuccess]);

    return (
        <>
            <div className="xl:px-4 lg:px-32 mt-8 lg:mt-20 rounded-lg bg-white">
                <div className="py-6 flex justify-end">
                    <Link href={"/dashboard/admin/coupon/create-coupon"} className="w-fit py-2 px-4 font-medium bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">Create Coupon</Link>
                </div>
                <CustomTable
                    columns={couponColumns}
                    data={couponData?.data?.data || []}
                    loading={isCouponDataLoading}
                    actions={actions}
                    pageSize={12}
                />
            </div>
        </>
    );
}
