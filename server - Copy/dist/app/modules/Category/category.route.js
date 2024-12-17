"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const multerUpload_1 = require("../../../helpars/multerUpload");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.VENDOR), category_controller_1.CategoryController.getCategories);
router.post("/", (0, auth_1.default)(client_1.UserRole.ADMIN), multerUpload_1.multerUpload.single("file"), category_controller_1.CategoryController.createCategory);
router.patch("/:categoryId", (0, auth_1.default)(client_1.UserRole.ADMIN), category_controller_1.CategoryController.editCategory);
router.delete("/:categoryId", (0, auth_1.default)(client_1.UserRole.ADMIN), category_controller_1.CategoryController.deleteCategory);
exports.CategoryRoutes = router;
