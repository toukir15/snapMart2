import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { Request } from "express";

const getCategories = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const createCategory = async (req: Request) => {
  const data = {
    name: JSON.parse(req.body.data).name,
    image: req.file!.path,
  };
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const editCategory = async (categoryId: string, data: Partial<Category>) => {
  const result = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data,
  });
  return result;
};

const deleteCategory = async (categoryId: string) => {
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
};
