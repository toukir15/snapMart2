import { Cupon } from "@prisma/client";
import prisma from "../../../shared/prisma";

const getCupons = async () => {
  const result = await prisma.cupon.findMany();
  return result;
};

const getCupon = async (id: string) => {
  const result = await prisma.cupon.findFirst({
    where: {
      id: id
    }
  });
  return result;
};

const createCupon = async (payload: Cupon) => {
  const result = await prisma.cupon.create({
    data: payload,
  });
  return result;
};

const editCoupon = async (id: string, data: Partial<Cupon>) => {
  const result = await prisma.cupon.update({
    where: {
      id: id
    },
    data: {
      ...data,
    }
  });
  return result;
};

const deleteCoupon = async (id: string) => {
  const result = await prisma.cupon.delete({
    where: {
      id: id
    }
  });
  return result;
};

export const CuponServices = {
  createCupon,
  getCupons,
  getCupon,
  editCoupon,
  deleteCoupon
};
