interface IShopParams {
    params: {
        shopId: string
    }
}

interface IShop {
    id: string;
    name: string;
    description: string;
    logo: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    vendorId: string;
}
