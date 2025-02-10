import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { Request } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const getCategories = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const getCategory = async (id: string) => {
  const result = await prisma.category.findFirst({
    where: {
      id: id
    }
  });
  return result;
};

const createCategory = async (req: Request) => {
  const data = {
    name: JSON.parse(req.body.data).name,
    image: req.file!.path,
  };

  const findCategory = await prisma.category.findFirst({
    where: {
      name: data.name
    }
  })

  if (findCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This category already exist")
  }

  const result = await prisma.category.create({
    data,
  });
  return result;
};

const editCategory = async (categoryId: string, req: Request) => {
  const data: any = {
    name: JSON.parse(req.body.data).name,
  };

  if (req.file?.path) {
    data.image = req.file?.path
  }

  const result = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data,
  });
  return result;
};

const deleteCategory = async (categoryId: string) => {
  console.log(categoryId)
  const result = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return result;
};

export const CategoryServices = {
  createCategory,
  editCategory,
  deleteCategory,
  getCategories,
  getCategory
};
