"use server"
import axiosInstance from "@/src/lib/axiosInstance";

export const getCoupons = async () => {
    try {
        const { data } = await axiosInstance.get(`/coupon`);
        return { data };
    } catch (error) {
        throw error;
    }
};

export const getCoupon = async (id: string) => {
    try {
        const { data } = await axiosInstance.get(`/coupon/${id}`);
        return { data };
    } catch (error) {
        throw error;
    }
};