import { Admin, UserRole, UserStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { IFile } from "../../interfaces/file";
import { Request } from "express";
import prisma from "../../../shared/prisma";

const getUsers = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: {
        not: "ADMIN",
      },
    },
  });
  return result;
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

const deleteUsers = async () => {
  // Delete records in dependent tables
  await prisma.customer.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.admin.deleteMany();

  // Now delete users
  const result = await prisma.user.deleteMany();
  return result;
};

// const getAllFromDB = async (params: any, options: IPaginationOptions) => {
//   const { page, limit, skip } = paginationHelper.calculatePagination(options);
//   const { searchTerm, ...filterData } = params;

//   const andCondions: Prisma.UserWhereInput[] = [];

//   //console.log(filterData);
//   if (params.searchTerm) {
//     andCondions.push({
//       OR: userSearchAbleFields.map((field) => ({
//         [field]: {
//           contains: params.searchTerm,
//           mode: "insensitive",
//         },
//       })),
//     });
//   }

//   if (Object.keys(filterData).length > 0) {
//     andCondions.push({
//       AND: Object.keys(filterData).map((key) => ({
//         [key]: {
//           equals: (filterData as any)[key],
//         },
//       })),
//     });
//   }

//   const whereConditons: Prisma.UserWhereInput =
//     andCondions.length > 0 ? { AND: andCondions } : {};

//   const result = await prisma.user.findMany({
//     where: whereConditons,
//     skip,
//     take: limit,
//     orderBy:
//       options.sortBy && options.sortOrder
//         ? {
//             [options.sortBy]: options.sortOrder,
//           }
//         : {
//             createdAt: "desc",
//           },
//     select: {
//       id: true,
//       email: true,
//       role: true,
//       needPasswordChange: true,
//       status: true,
//       createdAt: true,
//       updatedAt: true,
//       admin: true,
//       patient: true,
//       doctor: true,
//     },
//   });

//   const total = await prisma.user.count({
//     where: whereConditons,
//   });

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

// const changeProfileStatus = async (id: string, status: UserRole) => {
//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       id,
//     },
//   });

//   const updateUserStatus = await prisma.user.update({
//     where: {
//       id,
//     },
//     data: status,
//   });

//   return updateUserStatus;
// };

// const getMyProfile = async (user: IAuthUser) => {
//   const userInfo = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: user?.email,
//       status: UserStatus.ACTIVE,
//     },
//     select: {
//       id: true,
//       email: true,
//       needPasswordChange: true,
//       role: true,
//       status: true,
//     },
//   });

//   let profileInfo;

//   if (userInfo.role === UserRole.SUPER_ADMIN) {
//     profileInfo = await prisma.admin.findUnique({
//       where: {
//         email: userInfo.email,
//       },
//     });
//   } else if (userInfo.role === UserRole.ADMIN) {
//     profileInfo = await prisma.admin.findUnique({
//       where: {
//         email: userInfo.email,
//       },
//     });
//   } else if (userInfo.role === UserRole.DOCTOR) {
//     profileInfo = await prisma.doctor.findUnique({
//       where: {
//         email: userInfo.email,
//       },
//     });
//   } else if (userInfo.role === UserRole.PATIENT) {
//     profileInfo = await prisma.patient.findUnique({
//       where: {
//         email: userInfo.email,
//       },
//     });
//   }

//   return { ...userInfo, ...profileInfo };
// };

// const updateMyProfie = async (user: IAuthUser, req: Request) => {
//   const userInfo = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: user?.email,
//       status: UserStatus.ACTIVE,
//     },
//   });

//   const file = req.file as IFile;
//   if (file) {
//     const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
//     req.body.profilePhoto = uploadToCloudinary?.secure_url;
//   }

//   let profileInfo;

//   if (userInfo.role === UserRole.SUPER_ADMIN) {
//     profileInfo = await prisma.admin.update({
//       where: {
//         email: userInfo.email,
//       },
//       data: req.body,
//     });
//   } else if (userInfo.role === UserRole.ADMIN) {
//     profileInfo = await prisma.admin.update({
//       where: {
//         email: userInfo.email,
//       },
//       data: req.body,
//     });
//   } else if (userInfo.role === UserRole.DOCTOR) {
//     profileInfo = await prisma.doctor.update({
//       where: {
//         email: userInfo.email,
//       },
//       data: req.body,
//     });
//   } else if (userInfo.role === UserRole.PATIENT) {
//     profileInfo = await prisma.patient.update({
//       where: {
//         email: userInfo.email,
//       },
//       data: req.body,
//     });
//   }

//   return { ...profileInfo };
// };

export const userService = {
  createAdmin,
  createVendor,
  createCustomer,
  deleteUsers,
  getUsers,
  updateStatus,
  //   createDoctor,
  //   createPatient,
  //   getAllFromDB,
  //   changeProfileStatus,
  //   getMyProfile,
  //   updateMyProfie,
};
