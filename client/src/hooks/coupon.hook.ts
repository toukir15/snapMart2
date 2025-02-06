import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCoupon, deleteCoupon, editCoupon } from "../services/coupon/mutation";
import { getCoupon, getCoupons } from "../services/coupon/serverQuery";
import { Toast } from "../utils/toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    const router = useRouter();

    return useMutation({
        mutationFn: (data: any) => createCoupon(data),
        onSuccess: (data) => {
            if (data.data.success) {
                Toast("success", "Coupon created successfully!");
            }
            router.push("/dashboard/admin/coupon");
            queryClient.invalidateQueries(["COUPONS"]);
        },
        onError: (error: any) => {
            // Extract and show the error message
            const errorMessage = error.response?.data?.message || "Failed to create coupon.";
            Toast("error", errorMessage);
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