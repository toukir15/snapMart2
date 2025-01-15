import UpdateCategoryForm from "@/src/components/pageComponents/Category/UpdateCategoryForm";
import { EditCouponForm } from "@/src/components/pageComponents/Coupon/EditCouponForm";
import React from "react";

const EditCategoryPage = async ({ params }: { params: Promise<{ couponId: string }> }) => {
    const resolvedParams = await params;
    const couponId = resolvedParams.couponId;

    return (
        <EditCouponForm id={couponId} />
    );
};

export default EditCategoryPage;
