"use server"
import axiosInstance from "@/src/lib/axiosInstance";

export const createCoupon = async (couponData: any) => {
    try {
        const { data } = await axiosInstance.post(`/coupon`, couponData);
        return { data };
    } catch (error: any) {
        throw error.response.data;
    }
};

export const editCoupon = async (id: string, couponData: any) => {
    try {
        const { data } = await axiosInstance.patch(`/coupon/${id}`, couponData);
        return { data };
    } catch (error) {
        throw error;
    }
};

export const deleteCoupon = async (id: string) => {
    try {
        const { data } = await axiosInstance.delete(`/coupon/${id}`);
        return { data };
    } catch (error) {
        throw error;
    }
};