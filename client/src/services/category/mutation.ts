"use server"
import axiosInstance from "@/src/lib/axiosInstance";

export const createCategory = async (categoryData: any) => {
    try {
        const { data } = await axiosInstance.post(`/category`, categoryData);
        return { data };
    } catch (error) {
        throw error;
    }
};

export const editCategory = async (id: string, categoryData: any) => {
    try {
        const { data } = await axiosInstance.patch(`/category/${id}`, categoryData);
        return { data };
    } catch (error) {
        throw error;
    }
};

export const deleteCategory = async (id: string) => {
    console.log(id)
    try {
        const { data } = await axiosInstance.delete(`/category/${id}`);
        return { data };
    } catch (error) {
        throw error;
    }
};