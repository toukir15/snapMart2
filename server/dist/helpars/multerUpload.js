"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = require("../config/cloudinary");
const removeExtension = (filename) => {
    return filename === null || filename === void 0 ? void 0 : filename.split(".").slice(0, -1).join(".");
};
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.cloudinaryUpload,
    params: {
        public_id: (_req, file) => Math.random().toString(36).substring(2) +
            "-" +
            Date.now() +
            "-" +
            (file === null || file === void 0 ? void 0 : file.fieldname) +
            "-" +
            removeExtension(file === null || file === void 0 ? void 0 : file.originalname),
    },
});
exports.multerUpload = (0, multer_1.default)({ storage: storage });
