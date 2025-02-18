import { Admin, UserRole, UserStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { IFile } from "../../interfaces/file";
import { Request } from "express";
import prisma from "../../../shared/prisma";

const getUsers = async () => {
  // Fetch users excluding ADMIN
  const users = await prisma.user.findMany({
    where: {
      role: {
        not: "ADMIN",
      },
    },
  });

  // Custom sort logic for status
  const sortedUsers = users.sort((a, b) => {
    const statusOrder = ["ACTIVE", "BLOCKED", "DELETED"];
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });

  return sortedUsers;
};


const createAdmin = async (req: Request): Promise<Admin> => {
  const file = req.file as IFile;
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const userData = {
    name: req.body.admin.name,
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
    profilePhoto: file.path
  };

  const data = {
    ...req.body.admin,
    profilePhoto: file.path,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });


    const createdAdminData = await transactionClient.admin.create({
      data: data,
    });

    return createdAdminData;
  });

  return result;
};

const createVendor = async (req: Request) => {
  const file = req.file as IFile;
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    name: req.body.name,
    email: req.body.email,
    profilePhoto: file?.path
  };

  const ShopData: any = {
    name: req.body.shopName,
    description: req.body.description,
  }
  const role = req.body.role.toUpperCase();

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: { ...userData, password: hashedPassword, role },
    });

    const createVendorData = await transactionClient.vendor.create({
      data: userData,
    });

    const createShop = await transactionClient.shop.create({
      data: { ...ShopData, vendorId: createVendorData.id }
    })

    const updateVendor = await transactionClient.vendor.update({
      where: { id: createVendorData.id },
      data: { shopId: createShop.id },
    })

    return updateVendor;
  });
  return result;
};

const createCustomer = async (req: Request) => {
  const file = req.file as IFile;
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
  const userData = {
    name: req.body.name,
    email: req.body.email,
    profilePhoto: file?.path
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: { ...userData, role: UserRole.CUSTOMER, password: hashedPassword },
    });
    const createCustomerData = await transactionClient.customer.create({
      data: userData,
    });
    return createCustomerData;
  });
  console.log(result)
  return result;
};

const getAdmins = async () => {
  // Fetch users excluding ADMIN
  const users = await prisma.admin.findMany();

  // Custom sort logic for status
  const sortedUsers = users.sort((a, b) => {
    const statusOrder = ["ACTIVE", "BLOCKED", "DELETED"];
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });

  return sortedUsers;
};

const getVendors = async () => {
  // Fetch users excluding ADMIN
  const users = await prisma.vendor.findMany();

  // Custom sort logic for status
  const sortedUsers = users.sort((a, b) => {
    const statusOrder = ["ACTIVE", "BLOCKED", "DELETED"];
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });

  return sortedUsers;
};

const getCustomers = async () => {
  // Fetch users excluding ADMIN
  const users = await prisma.user.findMany();

  // Custom sort logic for status
  const sortedUsers = users.sort((a, b) => {
    const statusOrder = ["ACTIVE", "BLOCKED", "DELETED"];
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });

  return sortedUsers;
};

const updateStatus = async (id: string, newStatus: UserStatus) => {
  await prisma.user.findFirstOrThrow({
    where: {
      id: id,
    },
  });

  // If user exists, proceed to update
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      status: newStatus,
    },
  });

  return result;
};

export const userService = {
  createAdmin,
  createVendor,
  createCustomer,
  getUsers,
  updateStatus,
  getAdmins,
  getVendors,
  getCustomers
};
