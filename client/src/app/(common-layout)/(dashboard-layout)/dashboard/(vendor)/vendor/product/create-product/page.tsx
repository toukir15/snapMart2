import CreateProductForm from "@/src/components/pageComponents/Product/CreateProductForm";
import { getBrands } from "@/src/services/brand/query";

const CreateProduct = async () => {

    const brands = await getBrands()

    return (
        <CreateProductForm brandsData={brands.data} />
    );
};

export default CreateProduct;
