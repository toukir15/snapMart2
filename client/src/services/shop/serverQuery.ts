"use server";
import axiosInstance from "@/src/lib/axiosInstance";

export const getShops = async () => {
    try {
        const { data } = await axiosInstance.get(`/shop`);
        return { data };
    } catch (error: any) {
        throw new Error(
            error.message || "An error occurred while fetching products."
        );
    }
};
