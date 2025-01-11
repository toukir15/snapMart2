import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { Request } from "express";

const getBrands = async () => {
  const result = await prisma.brand.findMany();
  return result;
};

const getBrand = async (id: string) => {
  const result = await prisma.brand.findFirst({
    where: {
      id: id
    }
  });
  return result;
};

const createBrand = async (req: Request) => {
  const data = {
    name: JSON.parse(req.body.data).name,
    logo: req.file!.path,
  };
  const result = await prisma.brand.create({
    data,
  });
  return result;
};

const editBrand = async (brandId: string, req: Request) => {
  const data: any = {
    name: JSON.parse(req.body.data).name,
  };

  if (req.file?.path) {
    data.logo = req.file?.path
  }

  const result = await prisma.brand.update({
    where: {
      id: brandId,
    },
    data,
  });
  return result;
};

const deleteBrand = async (brandId: string) => {
  const result = await prisma.brand.delete({
    where: {
      id: brandId,
    },
  });
  return result;
};

export const BrandServices = {
  createBrand,
  editBrand,
  deleteBrand,
  getBrands,
  getBrand
};
