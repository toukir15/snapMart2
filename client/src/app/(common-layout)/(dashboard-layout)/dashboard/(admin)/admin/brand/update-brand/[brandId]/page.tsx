import UpdateBrandForm from "@/src/components/pageComponents/Brand/UpdateBrandForm";
import React from "react";

const EditBrandPage = async ({ params }: { params: Promise<{ brandId: string }> }) => {
    const resolvedParams = await params;
    const brandId = resolvedParams.brandId;


    return (
        <UpdateBrandForm id={brandId} />
    );
};

export default EditBrandPage;
