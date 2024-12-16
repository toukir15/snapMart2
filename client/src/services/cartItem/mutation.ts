"use server";
import axiosInstance from "@/src/lib/axiosInstance";

export const createPayment = async () => {
  try {
    const { data } = await axiosInstance.post(`/payments/create-payment`);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateCartItem = async (payload: { type: string; id: string }) => {
  try {
    const { data } = await axiosInstance.patch("/cart-item", payload);
    return { data };
  } catch (error: any) {
    throw new Error(
      error.message || "An error occurred while fetching products."
    );
  }
};
