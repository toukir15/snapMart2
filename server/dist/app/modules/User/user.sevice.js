"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
        where: {
            role: {
                not: "ADMIN",
            },
        },
    });
    return result;
});
const createAdmin = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const hashedPassword = yield bcrypt.hash(req.body.password, 12);
    const userData = {
        name: req.body.admin.name,
        email: req.body.admin.email,
        password: hashedPassword,
        role: client_1.UserRole.ADMIN,
        profilePhoto: file.path
    };
    const data = Object.assign(Object.assign({}, req.body.admin), { profilePhoto: file.path });
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.create({
            data: userData,
        });
        const createdAdminData = yield transactionClient.admin.create({
            data: data,
        });
        return createdAdminData;
    }));
    return result;
});
const createVendor = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const hashedPassword = yield bcrypt.hash(req.body.password, 12);
    const userData = {
        name: req.body.vendor.name,
        email: req.body.vendor.email,
        password: hashedPassword,
        role: client_1.UserRole.VENDOR,
        profilePhoto: file.path
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.create({
            data: userData,
        });
        const vendorData = Object.assign(Object.assign({}, req.body.vendor), { profilePhoto: file.path });
        const createVendorData = yield transactionClient.vendor.create({
            data: vendorData,
        });
        return createVendorData;
    }));
    return result;
});
const createCustomer = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const hashedPassword = yield bcrypt.hash(req.body.password, 12);
    const userData = {
        name: req.body.customer.name,
        email: req.body.customer.email,
        password: hashedPassword,
        role: client_1.UserRole.CUSTOMER,
        profilePhoto: file.path
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.create({
            data: userData,
        });
        const customerData = Object.assign(Object.assign({}, req.body.customer), { profilePhoto: file.path });
        const createCustomerData = yield transactionClient.customer.create({
            data: customerData,
        });
        return createCustomerData;
    }));
    return result;
});
const updateStatus = (id, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findFirstOrThrow({
        where: {
            id: id,
        },
    });
    // If user exists, proceed to update
    const result = yield prisma_1.default.user.update({
        where: {
            id: id,
        },
        data: {
            status: newStatus,
        },
    });
    return result;
});
const deleteUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    // Delete records in dependent tables
    yield prisma_1.default.customer.deleteMany();
    yield prisma_1.default.vendor.deleteMany();
    yield prisma_1.default.admin.deleteMany();
    // Now delete users
    const result = yield prisma_1.default.user.deleteMany();
    return result;
});
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
exports.userService = {
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
