"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { revalidateTag } from "next/cache";

export const createProduct = async (productData: any) => {
    try {
        const { data } = await axiosInstance.post(`/product`, productData);
        revalidateTag("products")
        return { data };
    } catch (error: any) {
        throw new Error(error);
    }
};

export const editProduct = async (productData: any, productId: string) => {
    try {
        const { data } = await axiosInstance.patch(`/product/${productId}`, productData);
        return { data };
    } catch (error: any) {
        throw new Error(error);
    }
};

export const deleteProduct = async (id: any) => {
    try {
        const { data } = await axiosInstance.delete(`/product/${id}`);
        return { data };
    } catch (error: any) {
        throw new Error(error);
    }
};
