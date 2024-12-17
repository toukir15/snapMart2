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
exports.ProductService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const getProducts = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const andCondition = [];
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(options);
    // Filter by search term
    if (params.searchTerm) {
        andCondition.push({
            OR: [
                {
                    name: {
                        contains: params.searchTerm,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }
    // Filter by price range
    if (params.price) {
        const [minPrice, maxPrice] = params.price.split("-").map(Number);
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            andCondition.push({
                price: {
                    gte: minPrice,
                    lte: maxPrice,
                },
            });
        }
    }
    // Filter by category
    if (params.category) {
        andCondition.push({
            category: {
                name: {
                    equals: params.category,
                    mode: "insensitive",
                },
            },
        });
    }
    // Filter by category
    if (params.brand) {
        andCondition.push({
            brand: {
                equals: params.brand,
                mode: "insensitive",
            },
        });
    }
    const whereConditions = { AND: andCondition };
    const result = yield prisma_1.default.product.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    const total = yield prisma_1.default.product.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getFlashSaleProducts = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const andCondition = [
        {
            isFlashSale: true,
        },
    ];
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(options);
    // Filter by search term
    if (params.searchTerm) {
        andCondition.push({
            name: {
                contains: params.searchTerm,
                mode: "insensitive",
            },
        });
    }
    // Filter by price range
    if (params.price) {
        const [minPrice, maxPrice] = params.price.split("-").map(Number);
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            andCondition.push({
                price: {
                    gte: minPrice,
                    lte: maxPrice,
                },
            });
        }
    }
    // Filter by category
    if (params.category) {
        andCondition.push({
            category: {
                name: {
                    equals: params.category,
                    mode: "insensitive",
                },
            },
        });
    }
    const whereConditions = { AND: andCondition };
    const result = yield prisma_1.default.product.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    const total = yield prisma_1.default.product.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSuggestedProducts = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the product to get its brand and price
    const findProduct = yield prisma_1.default.product.findUnique({
        where: {
            id: productId,
        },
    });
    if (!findProduct) {
        throw new Error("Product not found");
    }
    // Find products within the price range and same brand
    const result = yield prisma_1.default.product.findMany({
        where: {
            id: {
                not: productId,
            },
            brand: findProduct.brand,
            price: {
                gte: findProduct.price - 200,
                lte: findProduct.price + 200,
            },
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        take: 6,
    });
    return result;
});
const getBrands = () => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch all unique brand names from the product table
    const result = yield prisma_1.default.product.findMany({
        distinct: ["brand"], // Ensures only unique brand names are fetched
        select: {
            brand: true, // Select only the brand field
        },
    });
    // Extract the brand names from the result
    const brands = result.map((product) => product.brand);
    return brands;
});
const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findUnique({
        where: { id },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return result;
});
const createProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const productImages = files.map((file) => file.path);
    const shopId = req.body.shopId;
    const name = req.body.name;
    // Check if the vendor already has a shop
    const existingProduct = yield prisma_1.default.product.findFirst({
        where: {
            shopId: shopId,
            name: name,
        },
    });
    if (existingProduct) {
        throw new Error("Vendor already add this product");
    }
    const productData = Object.assign(Object.assign({}, req.body), { images: productImages });
    console.log(productData);
    const result = yield prisma_1.default.product.create({
        data: productData,
    });
    console.log(result);
    return result;
});
const updateProduct = (productId, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.product.findUniqueOrThrow({
        where: {
            id: productId,
        },
    });
    const result = yield prisma_1.default.product.update({
        where: {
            id: productId,
        },
        data,
    });
    return result;
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.product.findUniqueOrThrow({
        where: {
            id: productId,
        },
    });
    const result = yield prisma_1.default.product.delete({
        where: {
            id: productId,
        },
    });
    return result;
});
exports.ProductService = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getFlashSaleProducts,
    getProduct,
    getSuggestedProducts,
    getBrands,
};
