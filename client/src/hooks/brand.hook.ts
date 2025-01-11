import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBrand, deleteBrand, editBrand } from "../services/brand/mutation";
import { getBrand, getBrands } from "../services/brand/serverQuery";

export const useGetBrands = () => {
    return useQuery({
        queryKey: ["BRANDS"],
        queryFn: () => getBrands(),
    });
};

export const useGetBrand = (id: string) => {
    return useQuery({
        queryKey: ["BRAND"],
        queryFn: () => getBrand(id),
    });
};

export const useCreateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => createBrand(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["BRANDS"]);
        },
    });
};

export const useEditBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: any) => {
            return editBrand(id, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["BRANDS"]);
        },
    });
};

export const useDeleteBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: any) => {
            return deleteBrand(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["BRANDS"]);
        },
    });
};
