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
exports.AuthServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt = __importStar(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpars/jwtHelpers");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const isCorrectPassword = yield bcrypt.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Password incorrect!");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken(userData, config_1.default.jwt.jwt_access_secret, config_1.default.jwt.jwt_access_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.generateToken(userData, config_1.default.jwt.jwt_refresh_secret, config_1.default.jwt.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
// const refreshToken = async (token: string) => {
//   let decodedData;
//   try {
//     decodedData = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_token_secret as Secret
//     );
//   } catch (err) {
//     throw new Error("You are not authorized!");
//   }
//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: decodedData.email,
//       status: UserStatus.ACTIVE,
//     },
//   });
//   const accessToken = jwtHelpers.generateToken(
//     {
//       email: userData.email,
//       role: userData.role,
//     },
//     config.jwt.jwt_secret as Secret,
//     config.jwt.expires_in as string
//   );
//   return {
//     accessToken,
//     needPasswordChange: userData.needPasswordChange,
//   };
// };
// const changePassword = async (user: any, payload: any) => {
//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: user.email,
//       status: UserStatus.ACTIVE,
//     },
//   });
//   const isCorrectPassword: boolean = await bcrypt.compare(
//     payload.oldPassword,
//     userData.password
//   );
//   if (!isCorrectPassword) {
//     throw new Error("Password incorrect!");
//   }
//   const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);
//   await prisma.user.update({
//     where: {
//       email: userData.email,
//     },
//     data: {
//       password: hashedPassword,
//       needPasswordChange: false,
//     },
//   });
//   return {
//     message: "Password changed successfully!",
//   };
// };
// const forgotPassword = async (payload: { email: string }) => {
//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: payload.email,
//       status: UserStatus.ACTIVE,
//     },
//   });
//   const resetPassToken = jwtHelpers.generateToken(
//     { email: userData.email, role: userData.role },
//     config.jwt.reset_pass_secret as Secret,
//     config.jwt.reset_pass_token_expires_in as string
//   );
//   //console.log(resetPassToken)
//   const resetPassLink =
//     config.reset_pass_link + `?userId=${userData.id}&token=${resetPassToken}`;
//   await emailSender(
//     userData.email,
//     `
//         <div>
//             <p>Dear User,</p>
//             <p>Your password reset link
//                 <a href=${resetPassLink}>
//                     <button>
//                         Reset Password
//                     </button>
//                 </a>
//             </p>
//         </div>
//         `
//   );
//   //console.log(resetPassLink)
// };
// const resetPassword = async (
//   token: string,
//   payload: { id: string; password: string }
// ) => {
//   console.log({ token, payload });
//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       id: payload.id,
//       status: UserStatus.ACTIVE,
//     },
//   });
//   const isValidToken = jwtHelpers.verifyToken(
//     token,
//     config.jwt.reset_pass_secret as Secret
//   );
//   if (!isValidToken) {
//     throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
//   }
//   // hash password
//   const password = await bcrypt.hash(payload.password, 12);
//   // update into database
//   await prisma.user.update({
//     where: {
//       id: payload.id,
//     },
//     data: {
//       password,
//     },
//   });
// };
exports.AuthServices = {
    loginUser,
    //   refreshToken,
    //   changePassword,
    //   forgotPassword,
    //   resetPassword,
};
