"use server"
import axiosInstance from "@/src/lib/axiosInstance";

export const getCategories = async () => {
    try {
        const { data } = await axiosInstance.get(`/category`);
        return { data };
    } catch (error) {
        throw error;
    }
};

export const getCategory = async (id: string) => {
    try {
        const { data } = await axiosInstance.get(`/category/${id}`);
        return { data };
    } catch (error) {
        throw error;
    }
};