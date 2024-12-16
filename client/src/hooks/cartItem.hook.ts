import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateCartItem } from "../services/cartItem/mutation";
import { getCartCount } from "../services/cartItem/serverQuery";

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CART_ITEM"],
    mutationFn: (payload: { type: string; id: string }) =>
      updateCartItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["CART"]);
      queryClient.invalidateQueries(["CART_COUNT"]);

    },
  });
};

export const useGetCartCount = () => {
  return useQuery({
    queryKey: ["CART_COUNT"],
    queryFn: () => getCartCount(), // Ensure the query function matches the required structure
  });
};