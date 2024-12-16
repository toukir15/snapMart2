import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { Review } from "@prisma/client";
import { paginationHelper } from "../../../helpars/paginationHelper";

const createReview = async (payload: Review) => {
  const result = await prisma.review.create({
    data: payload,
  });
  return result;
};

const getReviews = async (options: any) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);

  const result = await prisma.review.findMany({
    where: {},
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      customer: true,
    },
  });
  const total = await prisma.review.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const ReviewService = {
  createReview,
  getReviews,
};
