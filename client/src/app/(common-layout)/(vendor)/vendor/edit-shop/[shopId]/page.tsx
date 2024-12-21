import EditShopForm from "@/src/components/pageComponents/Vendor/EditShop/EditShopForm";
import { getShop } from "@/src/services/shop/query";

const EditShopPage = async ({ params }: any) => {
    const { shopId } = await params;
    const { data: shopData } = await getShop(shopId)
    return (
        <>
            <EditShopForm shopData={shopData} />
        </>
    );
};

export default EditShopPage;
