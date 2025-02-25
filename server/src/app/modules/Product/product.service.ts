import { Request } from "express";
import { IFile } from "../../interfaces/file";
import prisma from "../../../shared/prisma";
import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpars/paginationHelper";
interface CustomRequest extends Request {
  user?: any;
}

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

  // Filter by price range
  if (params.shopId) {
    andCondition.push({
      shopId: params.shopId,
    });
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

const getVendorProducts = async (params: any, options: any, email: string) => {

  const findVendor = await prisma.vendor.findFirstOrThrow({
    where: {
      email: email
    }
  })


  const andCondition: Prisma.ProductWhereInput[] = [];
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  if (findVendor.shopId) {
    andCondition.push({
      OR: [
        {
          shopId: findVendor.shopId
        },
      ],
    });
  }

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
    // {
    //   isFlashSale: true,
    // },
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

const createProduct = async (req: CustomRequest) => {
  const files = req.files as IFile[];

  console.log(req.body, files)
  const productImages = files.map((file) => file.path);
  const findVendor = await prisma.vendor.findFirst({
    where: {
      email: req.user.email,
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
      connect: { id: req.body.categoryId },
    },
    shop: {
      connect: { id: findVendor.shopId },
    },
    price: Number(req.body.price),
    quantity: Number(req.body.quantity),
    discount: Number(req.body.discount),
    description: req.body.description,
    images: productImages,
  };
  const result = await prisma.product.create({
    data: productData,
  });

  return result;
};

const editProduct = async (req: CustomRequest, productId: string) => {
  const files = req.files as IFile[];
  const productImages = files.map((file) => file.path);

  const productData = req.body

  if (productImages.length > 0) {
    productData.images = productImages
  }

  if (productData.price.length > 0) {
    productData.price = Number(productData.price)
  }

  if (productData.rating.length > 0) {
    productData.rating = Number(productData.rating)
  }

  if (productData.inventoryCount.length > 0) {
    productData.inventoryCount = Number(productData.inventoryCount)
  }

  if (productData.discount.length > 0) {
    productData.discount = Number(productData.discount)
  }

  const result = await prisma.product.update({
    where: {
      id: productId
    },
    data: productData
  })

  return result

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
  console.log(result)

  return result;
};

export const ProductService = {
  getVendorProducts,
  createProduct,
  deleteProduct,
  getProducts,
  getFlashSaleProducts,
  getProduct,
  getSuggestedProducts,
  editProduct
};
