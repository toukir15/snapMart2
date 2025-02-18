"use server";
import axiosInstance from "@/src/lib/axiosInstance";

export const createVender = async (vendorData: any) => {
    console.log(vendorData)
    try {
        const { data } = await axiosInstance.post(`/user/create-vendor`, vendorData);
        return { data };
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
    }
};

export const createCustomer = async (customerData: any) => {
    try {
        const { data } = await axiosInstance.post(`/user/create-customer`, customerData);
        return { data };
    } catch (error: any) {
        throw new Error(error);
    }
};
