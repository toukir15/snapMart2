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

export const getUsers = async () => {
  try {
    const { data } = await axiosInstance.get(`/user`);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateStatus = async (userId: string, status: string) => {
  try {
    const { data } = await axiosInstance.patch(`/user/change-status/${userId}`, { status });
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/user/${userId}`);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};
