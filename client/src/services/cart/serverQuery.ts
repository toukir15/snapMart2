"use server";
import axiosInstance from "@/src/lib/axiosInstance";

export const getCart = async () => {
  try {
    const { data } = await axiosInstance.get(`/cart`);
    return { data };
  } catch (error) {
    throw error;
  }
};
