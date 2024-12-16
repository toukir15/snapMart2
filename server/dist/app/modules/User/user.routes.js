"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const user_validation_1 = require("./user.validation");
const multerUpload_1 = require("../../../helpars/multerUpload");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.userController.getUsers);
router.post("/create-admin", 
// auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
multerUpload_1.multerUpload.single("file"), (req, res, next) => {
    req.body = user_validation_1.userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return user_controller_1.userController.createAdmin(req, res, next);
});
router.post("/create-vendor", 
// auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
multerUpload_1.multerUpload.single("file"), (req, res, next) => {
    req.body = user_validation_1.userValidation.createVendor.parse(JSON.parse(req.body.data));
    return user_controller_1.userController.createVendor(req, res, next);
});
router.post("/create-customer", multerUpload_1.multerUpload.single("file"), (req, res, next) => {
    req.body = user_validation_1.userValidation.createCustomer.parse(JSON.parse(req.body.data));
    return user_controller_1.userController.createCustomer(req, res, next);
});
router.delete("/", user_controller_1.userController.deleteUsers);
router.patch("/change-status/:userId", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.userController.updateStatus);
exports.userRoutes = router;
