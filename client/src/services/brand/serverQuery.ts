"use server"
import axiosInstance from "@/src/lib/axiosInstance";

export const getBrands = async () => {
    try {
        const { data } = await axiosInstance.get(`/brand`);
        return { data };
    } catch (error) {
        throw error;
    }
};

export const getBrand = async (id: string) => {
    try {
        const { data } = await axiosInstance.get(`/brand/${id}`);
        return { data };
    } catch (error) {
        throw error;
    }
};
