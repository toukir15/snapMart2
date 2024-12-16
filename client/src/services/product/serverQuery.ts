"use server";
import axiosInstance from "@/src/lib/axiosInstance";
// import { IProductsProps } from "@/src/types/api/product";

export const createPayment = async () => {
  try {
    const { data } = await axiosInstance.post(`/payments/create-payment`);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getProducts = async ({
  brand,
  category,
  searchTerm,
  minPrice,
  maxPrice,
  productPage,
}: any) => {
  try {
    let query = `/product?`;

    // Add other query parameters conditionally
    if (category) query += `category=${category}&`;
    if (brand) query += `brand=${brand}&`;
    if (searchTerm) query += `searchTerm=${searchTerm}&`;
    if (productPage) query += `page=${productPage}&`;

    // Add the price query only if maxPrice > 0
    if (maxPrice > 0) query += `price=${minPrice}-${maxPrice}`;

    // Remove the trailing "&" or "?" if needed
    query =
      query.endsWith("&") || query.endsWith("?") ? query.slice(0, -1) : query;

    const { data } = await axiosInstance.get(query);
    return { data };
  } catch (error: any) {
    throw new Error(
      error.message || "An error occurred while fetching products."
    );
  }
};
