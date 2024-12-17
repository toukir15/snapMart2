"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multerUpload_1 = require("../../../helpars/multerUpload");
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.VENDOR), multerUpload_1.multerUpload.array("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return product_controller_1.ProductController.createProduct(req, res, next);
});
router.get("/", product_controller_1.ProductController.getProducts);
router.get("/flash-sale", product_controller_1.ProductController.getFlashSaleProducts);
router.get("/brand", product_controller_1.ProductController.getBrands);
router.get("/suggested/:productId", product_controller_1.ProductController.getSuggestedProducts);
router.get("/:productId", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER), product_controller_1.ProductController.getProduct);
router.patch("/:productId", (0, auth_1.default)(client_1.UserRole.VENDOR), product_controller_1.ProductController.updateProduct);
router.delete("/:productId", (0, auth_1.default)(client_1.UserRole.VENDOR), product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
