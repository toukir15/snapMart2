"use server";
import axiosInstance from "@/src/lib/axiosInstance";

export const createShop = async (shopData: any) => {
    try {
        const { data } = await axiosInstance.post(`/shop`, shopData);
        return { data };
    } catch (error: any) {
        throw new Error(error);
    }
};
