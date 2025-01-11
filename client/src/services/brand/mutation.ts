"use server"
import axiosInstance from "@/src/lib/axiosInstance";

export const createBrand = async (brandData: any) => {
    try {
        const { data } = await axiosInstance.post(`/brand`, brandData);
        return { data };
    } catch (error) {
        throw error;
    }
};

export const editBrand = async (id: string, brandData: any) => {
    try {
        const { data } = await axiosInstance.patch(`/brand/${id}`, brandData);
        return { data };
    } catch (error) {
        throw error;
    }
};

export const deleteBrand = async (id: string) => {
    try {
        const { data } = await axiosInstance.delete(`/brand/${id}`);
        return { data };
    } catch (error) {
        throw error;
    }
};