
export const getShop = async (shopId: string) => {
    try {
        const fetchOption = {
            next: {
                tags: ["products"],
            },
        };

        const res = await fetch(
            `http://localhost:5000/api/v1/shop/${shopId}`,
            fetchOption
        );
        return await res.json();
    } catch (error) {
        throw error;
    }
};
