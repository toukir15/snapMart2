import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createShop, editShop, updateStatus } from "../services/shop/mutation";
import { getShops } from "../services/shop/serverQuery";

export const useCreateShop = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["SHOP"],
        mutationFn: (payload: any) =>
            createShop(payload),
        onSuccess: () => {
            queryClient.invalidateQueries(["CART"]);
            queryClient.invalidateQueries(["CART_COUNT"]);
        },
    });
};
export const useUpdateStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }: any) => updateStatus(id, status),
        onSuccess: async () => {
            queryClient.invalidateQueries(["SHOPS"]);
        },
    });
};

export const useEditShop = () => {
    return useMutation({
        mutationKey: ["EDIT_SHOP"],
        mutationFn: ({ formData, shopId }: any) =>
            editShop(formData, shopId),
    });
};

export const useGetShops = () => {
    return useQuery({
        queryKey: ["SHOPS"],
        queryFn: () => getShops(),
    });
};

// export const useGetCartCount = () => {
//     return useQuery({
//         queryKey: ["CART_COUNT"],
//         queryFn: () => getCartCount(), // Ensure the query function matches the required structure
//     });
// };