import { Request } from "express";
import { IFile } from "../../interfaces/file";
import prisma from "../../../shared/prisma";
import { Prisma, Product } from "@prisma/client";
import { paginationHelper } from "../../../helpars/paginationHelper";

const getProducts = async (params: any, options: any) => {
  const andCondition: Prisma.ProductWhereInput[] = [];
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

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

  const whereConditions: Prisma.ProductWhereInput = { AND: andCondition };
  const result = await prisma.product.findMany({
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

  const total = await prisma.product.count({
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
};

const getFlashSaleProducts = async (params: any, options: any) => {
  const andCondition: Prisma.ProductWhereInput[] = [
    {
      isFlashSale: true,
    },
  ];

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

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

  const whereConditions: Prisma.ProductWhereInput = { AND: andCondition };

  const result = await prisma.product.findMany({
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

  const total = await prisma.product.count({
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
};

const getSuggestedProducts = async (productId: string) => {
  // Find the product to get its brand and price
  const findProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!findProduct) {
    throw new Error("Product not found");
  }

  // Find products within the price range and same brand
  const result = await prisma.product.findMany({
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
};
const getBrands = async () => {
  // Fetch all unique brand names from the product table
  const result = await prisma.product.findMany({
    distinct: ["brand"], // Ensures only unique brand names are fetched
    select: {
      brand: true, // Select only the brand field
    },
  });

  // Extract the brand names from the result
  const brands = result.map((product) => product.brand);

  return brands;
};

const getProduct = async (id: string) => {
  const result = await prisma.product.findUnique({
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
};

const createProduct = async (req: Request) => {
  const files = req.files as IFile[];
  const productImages = files.map((file) => file.path);
  const findVendor = await prisma.vendor.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (!findVendor || !findVendor.shopId) {
    throw new Error("Vendor does not exist or does not have a shop.");
  }

  // Check if the vendor already has the product
  const existingProduct = await prisma.product.findFirst({
    where: {
      shopId: findVendor.shopId,
      name: req.body.name,
    },
  });

  if (existingProduct) {
    throw new Error("Vendor already added this product");
  }
  // Define the product data
  const productData: Prisma.ProductCreateInput = {
    name: req.body.name,
    category: {
      connect: { id: req.body.category },
    },
    shop: {
      connect: { id: findVendor.shopId },
    },
    price: Number(req.body.price),
    brand: req.body.brand,
    rating: Number(req.body.rating),
    model: req.body.model,
    department: req.body.department,
    styleCode: req.body.styleCode,
    color: req.body.color,
    inventoryCount: Number(req.body.inventoryCount),
    discount: Number(req.body.discount),
    isFlashSale: req.body.flashSale, // Ensure boolean
    description: req.body.description,
    images: productImages,
  };
  console.log(productData)
  const result = await prisma.product.create({
    data: productData,
  });
  console.log(result)

  return result;
};



const updateProduct = async (productId: string, data: Partial<Product>) => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id: productId,
    },
  });

  const result = await prisma.product.update({
    where: {
      id: productId,
    },
    data,
  });

  return result;
};

const deleteProduct = async (productId: string) => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id: productId,
    },
  });

  const result = await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  return result;
};

export const ProductService = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getFlashSaleProducts,
  getProduct,
  getSuggestedProducts,
  getBrands,
};
