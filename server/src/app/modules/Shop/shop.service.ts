import { Request } from "express";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
interface CustomRequest extends Request {
  user?: any;
}

const getShops = async () => {
  const shops = await prisma.shop.findMany({
    include: {
      vendor: {
        select: { name: true, email: true },
      },
    },
  })
  // Custom sort logic for status
  const sortedShops = shops.sort((a, b) => {
    const statusOrder = [true, false];
    return statusOrder.indexOf(a.isActive) - statusOrder.indexOf(b.isActive);
  });

  return sortedShops;
};

const getShop = async (shopId: string) => {
  const result = await prisma.shop.findFirstOrThrow({
    where: {
      id: shopId
    }
  })
  return result
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

const editShop = async (req: CustomRequest) => {
  const file = req.file as IFile;
  await prisma.vendor.findFirstOrThrow({
    where: {
      email: req.user.email
    }
  })
  const editShopData = {
    ...req.body
  }

  if (file?.path) {
    editShopData.logo = file.path
  }

  const result = await prisma.shop.update({
    where: {
      id: req.params.shopId
    },
    data: editShopData
  })
  return result
};

const updateShopStatus = async (shopId: string, newStatus: boolean) => {
  await prisma.shop.findFirstOrThrow({
    where: {
      id: shopId,
    },
  });
  // If user exists, proceed to update
  const result = await prisma.shop.update({
    where: {
      id: shopId,
    },
    data: {
      isActive: newStatus,
    },
  });
  console.log(result)

  return result;
};

export const ShopServices = {
  createShop,
  updateShopStatus,
  getShop,
  editShop,
  getShops
};
