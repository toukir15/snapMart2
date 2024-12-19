import DuplicateForm from "@/src/components/pageComponents/DuplicateProduct/DuplicateForm";
import { getCategories } from "@/src/services/category/query";
import { getProduct } from "@/src/services/product/query";

const DuplicateFormPage = async ({ params }: any) => {
    const { productId } = await params
    const { data: productData } = await getProduct(productId);
    const { data: categoryData } = await getCategories();
    // console.log(categoryData)
    return (
        <>
            <DuplicateForm productData={productData} categoryData={categoryData} />
        </>
    );
};

export default DuplicateFormPage;
