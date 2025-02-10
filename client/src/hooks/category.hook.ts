import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories, getCategory } from "../services/category/serverQuery";
import { createCategory, deleteCategory, editCategory } from "../services/category/mutation";

export const useGetCategories = () => {
    return useQuery({
        queryKey: ["CATEGORIES"],
        queryFn: () => getCategories(),
    });
};

export const useGetCategory = (id: string) => {
    return useQuery({
        queryKey: ["CATEGORY"],
        queryFn: () => getCategory(id),
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => {
            console.log(data)
            return createCategory(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["CATEGORIES"]);
        },
    });
};

export const useEditCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: any) => {
            return editCategory(id, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["CATEGORIES"]);
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => {
            return deleteCategory(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["CATEGORIES"]);
        },
    });
};