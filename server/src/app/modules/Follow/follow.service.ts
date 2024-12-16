import prisma from "../../../shared/prisma";
import { IFollow } from "./follow.interface";

const createFollow = async (payload: IFollow) => {
  const result = await prisma.follow.create({
    data: payload,
  });
  return result;
};

export const FollowServices = {
  createFollow,
};
