"use server"
import axiosInstance from "@/src/lib/axiosInstance";

export const createCart = async (payload: any) => {
    try {
        const { data } = await axiosInstance.post(`/cart`, payload);
        return { data };
    } catch (error: any) {
        throw new Error(error);
    }
};