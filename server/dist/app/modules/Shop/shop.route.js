"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multerUpload_1 = require("../../../helpars/multerUpload");
const shop_controller_1 = require("./shop.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER), shop_controller_1.ShopController.blackListShop);
router.post("/", (0, auth_1.default)(client_1.UserRole.VENDOR), multerUpload_1.multerUpload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return shop_controller_1.ShopController.createShop(req, res, next);
});
router.patch("/black-list/:shopId", (0, auth_1.default)(client_1.UserRole.ADMIN), shop_controller_1.ShopController.blackListShop);
exports.ShopRoutes = router;
