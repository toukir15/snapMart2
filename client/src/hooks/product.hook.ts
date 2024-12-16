import { createProduct } from "../services/product/mutation";
import { getFlashSaleProducts } from "../services/product/query";
import { getProducts } from "../services/product/serverQuery";
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
  const queryClient = useQueryClient();

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

export const useCreateProduct = () => {

  return useMutation({
    mutationFn: async (data: any) => await createProduct(data),
    onSuccess: async (data) => {
    },
  });
};

export const useGetFlashSaleProducts = () => {
  return useQuery({
    queryKey: ["FLASH_SALE"],
    queryFn: () => getFlashSaleProducts(),
  });
};
