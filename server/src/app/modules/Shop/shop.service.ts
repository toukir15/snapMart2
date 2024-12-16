import { Request } from "express";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";

const getShop = () => {
  console.log("object");
};

const createShop = async (req: Request) => {
  const file = req.file as IFile;

  const vendorId = req.body.vendorId;

  // Start a Prisma transaction
  const result = await prisma.$transaction(async (tx) => {
    // Check if the vendor already has a shop
    const existingShop = await tx.shop.findUnique({
      where: {
        vendorId: vendorId,
      },
    });

    if (existingShop) {
      throw new Error("This vendor already has a shop.");
    }

    // Create the shop
    const shopData = {
      ...req.body,
      logo: file.path,
    };

    const shop = await tx.shop.create({
      data: shopData,
    });

    // Update the vendor with the created shop ID
    await tx.vendor.update({
      where: {
        id: vendorId,
      },
      data: {
        shopId: shop.id,
      },
    });

    return shop;
  });

  return result;
};

const blackListShop = async (shopId: string) => {
  const shop = await prisma.shop.findUniqueOrThrow({
    where: {
      id: shopId,
    },
  });

  const result = await prisma.shop.update({
    where: {
      id: shopId,
    },
    data: {
      isActive: !shop.isActive,
    },
  });
  return result;
};

export const ShopServices = {
  createShop,
  blackListShop,
  getShop,
};
