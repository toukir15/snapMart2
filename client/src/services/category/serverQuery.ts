"use server"
import axiosInstance from "@/src/lib/axiosInstance";

export const getCategory = async () => {
    try {
        const { data } = await axiosInstance.get(`/category`);
        return { data };
    } catch (error) {
        throw error;
    }
};