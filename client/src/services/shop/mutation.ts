"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { cookies } from "next/headers";

export const createShop = async (shopData: any) => {
    try {
        const { data } = await axiosInstance.post(`/shop`, shopData);
        if (data.success) {
            const cookieStore = await cookies()
            cookieStore.set("accessToken", data?.data?.accessToken)
        }
        return { data: data.data };
    } catch (error: any) {
        throw new Error(error);
    }
};

export const editShop = async (shopData: any, shopId: string) => {
    try {
        const { data } = await axiosInstance.patch(`/shop/${shopId}`, shopData);
        return { data: data.data };
    } catch (error: any) {
        throw new Error(error);
    }
};

export const updateStatus = async (shopId: any, status: string) => {
    try {
        const { data } = await axiosInstance.patch(`/shop/change-status/${shopId}`, { isActive: status });
        return { data: data.data };
    } catch (error: any) {
        throw new Error(error);
    }
};
