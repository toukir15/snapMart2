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
exports.ShopServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getShop = () => {
    console.log("object");
};
const createShop = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const vendorId = req.body.vendorId;
    // Check if the vendor already has a shop
    const existingShop = yield prisma_1.default.shop.findUnique({
        where: {
            vendorId: vendorId,
        },
    });
    if (existingShop) {
        throw new Error("This vendor already has a shop.");
    }
    const shopData = Object.assign(Object.assign({}, req.body), { logo: file.path });
    const result = yield prisma_1.default.shop.create({
        data: shopData,
    });
    return result;
});
const blackListShop = (shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield prisma_1.default.shop.findUniqueOrThrow({
        where: {
            id: shopId,
        },
    });
    const result = yield prisma_1.default.shop.update({
        where: {
            id: shopId,
        },
        data: {
            isActive: !shop.isActive,
        },
    });
    return result;
});
exports.ShopServices = {
    createShop,
    blackListShop,
    getShop,
};
