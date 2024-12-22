import { createProduct, deleteProduct, editProduct } from "../services/product/mutation";
import { getFlashSaleProducts } from "../services/product/query";
import { getProduct, getProducts, getVendorProducts } from "../services/product/serverQuery";
// import { IProductsProps } from "../types/api/product";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export const useGetProducts = ({
  brand,
  category,
  searchTerm,
  minPrice,
  maxPrice,
  productPage,
}: any) => {
  // const queryClient = useQueryClient();

  const queryKey = [
    "PRODUCTS",
    brand,
    category,
    searchTerm,
    minPrice,
    maxPrice,
    productPage,
  ];

  return useQuery<any, Error>({
    queryKey,
    queryFn: async () => {
      const data = await getProducts({
        brand,
        category,
        searchTerm,
        minPrice,
        maxPrice,
        productPage,
      });
      return data;
    },
    // onSuccess: (newData) => {
    //   console.log("New Data in onSuccess:", newData);

    //   queryClient.setQueryData(queryKey, (oldData: any) => {
    //     console.log("Old Cache Data in onSuccess:", oldData); // ক্যাশ ডেটা

    //     if (oldData) {
    //       const mergedData = [...oldData, ...newData];
    //       console.log("Merged Data in onSuccess:", mergedData); // মিশ্রিত ডেটা
    //       return mergedData;
    //     }
    //     return newData;
    //   });
    // },
    onError: (error) => {
      console.error("Error in useQuery:", error.message);
    },
    keepPreviousData: false,
    cacheTime: 0,
    staleTime: 0,
  });
};

export const useGetVendorProducts = () => {
  return useQuery<any, Error>({
    queryKey: ["VENDOR_PRODUCTS"],
    queryFn: async () => {
      const data = await getVendorProducts();
      return data;
    },
    // onSuccess: (newData) => {

    // },
  });
};

export const useGetProduct = (id: string) => {
  return useQuery<any, Error>({
    queryKey: ["PRODUCT", id],
    queryFn: async () => {
      const data = await getProduct(id);
      return data;
    },
    // onSuccess: (newData) => {

    // },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => await createProduct(data),
    onSuccess: async () => {
      queryClient.invalidateQueries(["VENDOR_PRODUCTS"]);
    },
  });
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, productId }: any) => await editProduct(formData, productId),
    onSuccess: async () => {
      queryClient.invalidateQueries(["VENDOR_PRODUCTS"]);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteProduct(id),
    onSuccess: async () => {
      queryClient.invalidateQueries(["VENDOR_PRODUCTS"]);
    },
  });
};

export const useGetFlashSaleProducts = () => {
  return useQuery({
    queryKey: ["FLASH_SALE"],
    queryFn: () => getFlashSaleProducts(),
  });
};
