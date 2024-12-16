"use strict";
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
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.loginUser(req.body);
    const { refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Logged in successfully!",
        data: {
            accessToken: result.accessToken,
        },
    });
}));
// const refreshToken = catchAsync(async (req: Request, res: Response) => {
//     const { refreshToken } = req.cookies;
//     const result = await AuthServices.refreshToken(refreshToken);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Access token genereated successfully!",
//         data: result
//         // data: {
//         //     accessToken: result.accessToken,
//         //     needPasswordChange: result.needPasswordChange
//         // }
//     })
// });
// const changePassword = catchAsync(async (req: Request & { user?: any }, res: Response) => {
//     const user = req.user;
//     const result = await AuthServices.changePassword(user, req.body);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Password Changed successfully",
//         data: result
//     })
// });
// const forgotPassword = catchAsync(async (req: Request, res: Response) => {
//     await AuthServices.forgotPassword(req.body);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Check your email!",
//         data: null
//     })
// });
// const resetPassword = catchAsync(async (req: Request, res: Response) => {
//     const token = req.headers.authorization || "";
//     await AuthServices.resetPassword(token, req.body);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Password Reset!",
//         data: null
//     })
// });
exports.AuthController = {
    loginUser,
    //   refreshToken,
    //   changePassword,
    //   forgotPassword,
    //   resetPassword,
};
