import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCoupon, deleteCoupon, editCoupon } from "../services/coupon/mutation";
import { getCoupon, getCoupons } from "../services/coupon/serverQuery";

export const useGetCoupons = () => {
    return useQuery({
        queryKey: ["COUPONS"],
        queryFn: () => getCoupons(),
    });
};

export const useGetCoupon = (id: string) => {
    return useQuery({
        queryKey: ["COUPON"],
        queryFn: () => getCoupon(id),
    });
};

export const useCreateCoupon = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            return createCoupon(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["COUPONS"]);
        },
    });
};

export const useEditCoupon = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: any) => {
            return editCoupon(id, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["COUPONS"]);
        },
    });
};

export const useDeleteCoupon = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: any) => {
            return deleteCoupon(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["COUPONS"]);
        },
    });
};