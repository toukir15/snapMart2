import { Request } from "express";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
interface CustomRequest extends Request {
  user?: any;
}

const getShop = async (shopId: string) => {
  const result = await prisma.shop.findFirstOrThrow({
    where: {
      id: shopId
    }
  })
  return result
};

const createShop = async (req: CustomRequest) => {
  console.log(req.user)
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

    await tx.vendor.update({
      where: {
        id: findVendor?.id,
      },
      data: {
        shopId: shop.id,
      },
    });
    const user = req.user
    const userData = {
      id: user.id,
      name: user.name,
      profilePhoto: user.profilePhoto,
      email: user.email,
      role: user.role,
      status: user.status,
      shopId: shop.id
    }

    const accessToken = jwtHelpers.generateToken(
      userData,
      config.jwt.jwt_access_secret as Secret,
      config.jwt.jwt_access_expires_in as string
    );

    return {
      accessToken: accessToken,
      data: shop
    };
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
