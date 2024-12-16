import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCart } from "../services/cart/mutation";
import { getCart } from "../services/cart/serverQuery";

export const useCreateCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: any) => createCart(payload),
        onSuccess: () => {
            queryClient.invalidateQueries(["CART_COUNT"]);
        },
    });
};

// export const useGetCart = () => {
//     return useQuery({
//         queryKey: ["CART"],
//         queryFn: async () => await getCart(),
//     });
// };
export const useGetCart = () => {
    return useQuery({
        queryKey: ["CART"], // Pass the query key inside an object
        queryFn: () => getCart(), // Ensure the query function matches the required structure
    });
};