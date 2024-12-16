"use server"
import axiosInstance from "@/src/lib/axiosInstance";

export const getCartCount = async () => {
    try {
        const { data } = await axiosInstance.get(`/cart-item/cart-count`);
        return { data };
    } catch (error) {
        throw error;
    }
};