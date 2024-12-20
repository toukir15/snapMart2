import EditForm from "@/src/components/pageComponents/EditProduct/EditForm";
import { getCategories } from "@/src/services/category/query";
import { getProduct } from "@/src/services/product/query";

const EditProductFormPage = async ({ params }: any) => {
    // Await params to avoid accessing it synchronously
    const { productId } = await params;
    const { data: productData } = await getProduct(productId);
    const { data: categoryData } = await getCategories();

    return (
        <>
            <EditForm productData={productData} categoryData={categoryData} />
        </>
    );
};

export default EditProductFormPage;
