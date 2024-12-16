"use server";
import axiosInstance from "@/src/lib/axiosInstance";

export const getFollowSuggetionUsers = async () => {
  try {
    const { data } = await axiosInstance.get(`/users/follow-suggetion`);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/${userId}`);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};
