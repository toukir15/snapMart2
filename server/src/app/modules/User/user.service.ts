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
    name: req.body.vendor.name,
    email: req.body.vendor.email,
    password: hashedPassword,
    role: UserRole.VENDOR,
    profilePhoto: file.path
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const vendorData = {
      ...req.body.vendor,
      profilePhoto: file.path,
    };

    const createVendorData = await transactionClient.vendor.create({
      data: vendorData,
    });
    return createVendorData;
  });

  return result;
};

const createCustomer = async (req: Request) => {
  const file = req.file as IFile;

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    name: req.body.customer.name,
    email: req.body.customer.email,
    password: hashedPassword,
    role: UserRole.CUSTOMER,
    profilePhoto: file.path
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const customerData = {
      ...req.body.customer,
      profilePhoto: file.path,
    };

    const createCustomerData = await transactionClient.customer.create({
      data: customerData,
    });

    return createCustomerData;
  });

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
