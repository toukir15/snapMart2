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
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const user_sevice_1 = require("./user.sevice");
const getUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_sevice_1.userService.getUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Retrive users successfuly!",
        data: result,
    });
}));
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_sevice_1.userService.createAdmin(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Admin Created successfuly!",
        data: result,
    });
}));
const createVendor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_sevice_1.userService.createVendor(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vendor Created successfuly!",
        data: result,
    });
}));
const createCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_sevice_1.userService.createCustomer(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Customer Created successfuly!",
        data: result,
    });
}));
const updateStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const newStatus = req.body.status;
    const result = yield user_sevice_1.userService.updateStatus(userId, newStatus);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Customer Created successfuly!",
        data: result,
    });
}));
const deleteUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_sevice_1.userService.deleteUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Customer Created successfuly!",
        data: result,
    });
}));
// const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
//     // console.log(req.query)
//     const filters = pick(req.query, userFilterableFields);
//     const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
//     const result = await userService.getAllFromDB(filters, options)
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Users data fetched!",
//         meta: result.meta,
//         data: result.data
//     })
// });
// const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result = await userService.changeProfileStatus(id, req.body)
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Users profile status changed!",
//         data: result
//     })
// });
// const getMyProfile = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
//     const user = req.user;
//     const result = await userService.getMyProfile(user as IAuthUser);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "My profile data fetched!",
//         data: result
//     })
// });
// const updateMyProfie = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
//     const user = req.user;
//     const result = await userService.updateMyProfie(user as IAuthUser, req);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "My profile updated!",
//         data: result
//     })
// });
exports.userController = {
    createAdmin,
    createVendor,
    createCustomer,
    deleteUsers,
    getUsers,
    updateStatus,
    // createPatient,
    // getAllFromDB,
    // changeProfileStatus,
    // getMyProfile,
    // updateMyProfie
};
