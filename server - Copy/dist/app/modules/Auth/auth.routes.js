"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/login", auth_controller_1.AuthController.loginUser);
// router.post(
//     '/refresh-token',
//     AuthController.refreshToken
// )
// router.post(
//     '/change-password',
//     auth(
//         UserRole.SUPER_ADMIN,
//         UserRole.ADMIN,
//         UserRole.DOCTOR,
//         UserRole.PATIENT
//     ),
//     AuthController.changePassword
// );
// router.post(
//     '/forgot-password',
//     AuthController.forgotPassword
// );
// router.post(
//     '/reset-password',
//     AuthController.resetPassword
// )
exports.AuthRoutes = router;
