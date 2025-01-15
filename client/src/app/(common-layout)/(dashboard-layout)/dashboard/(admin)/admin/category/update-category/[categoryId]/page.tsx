import UpdateCategoryForm from "@/src/components/pageComponents/Category/UpdateCategoryForm";
import React from "react";

const EditCategoryPage = async ({ params }: { params: Promise<{ categoryId: string }> }) => {
    const resolvedParams = await params;
    const categoryId = resolvedParams.categoryId;

    return (
        <UpdateCategoryForm id={categoryId} />
    );
};

export default EditCategoryPage;
