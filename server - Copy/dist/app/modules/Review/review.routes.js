"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), review_controller_1.ReviewControllers.getReviews);
router.post("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER), review_controller_1.ReviewControllers.createReview);
// router.post("/", auth(UserRole.CUSTOMER), ReviewController.insertIntoDB);
exports.ReviewRoutes = router;
