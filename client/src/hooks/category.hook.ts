import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../services/category/serverQuery";

export const useGetCategory = () => {
    return useQuery({
        queryKey: ["CATEGORY"],
        queryFn: () => getCategory(),
    });
};