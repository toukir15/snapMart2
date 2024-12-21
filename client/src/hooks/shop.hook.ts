import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createShop, editShop } from "../services/shop/mutation";

export const useCreateShop = () => {
    // const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["SHOP"],
        mutationFn: (payload: any) =>
            createShop(payload),
        // onSuccess: () => {
        //     queryClient.invalidateQueries(["CART"]);
        //     queryClient.invalidateQueries(["CART_COUNT"]);

        // },
    });
};
export const useEditShop = () => {
    return useMutation({
        mutationKey: ["EDIT_SHOP"],
        mutationFn: ({ formData, shopId }: any) =>
            editShop(formData, shopId),
    });
};

// export const useGetCartCount = () => {
//     return useQuery({
//         queryKey: ["CART_COUNT"],
//         queryFn: () => getCartCount(), // Ensure the query function matches the required structure
//     });
// };