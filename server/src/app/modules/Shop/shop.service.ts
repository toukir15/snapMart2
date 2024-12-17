import { Request } from "express";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";
interface CustomRequest extends Request {
  user?: any;
}

const getShop = () => {
  console.log("object");
};

const createShop = async (req: CustomRequest) => {
  const file = req.file as IFile;

  const findVendor = await prisma.vendor.findFirst({
    where: {
      email: req.user.email
    }
  })

  // Start a Prisma transaction
  const result = await prisma.$transaction(async (tx) => {
    // Check if the vendor already has a shop
    const existingShop = await tx.shop.findUnique({
      where: {
        vendorId: findVendor?.id,
      },
    });

    if (existingShop) {
      throw new Error("This vendor already has a shop.");
    }

    // Create the shop
    const shopData = {
      ...req.body,
      vendorId: findVendor?.id,
      logo: file.path,
    };

    const shop = await tx.shop.create({
      data: shopData,
    });

    // Update the vendor with the created shop ID
    await tx.vendor.update({
      where: {
        id: findVendor?.id,
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
