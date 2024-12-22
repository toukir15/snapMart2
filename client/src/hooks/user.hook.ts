import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, updateStatus } from "../services/user";

export const useGetUsers = () => {
    return useQuery({
        queryKey: ["USERS"],
        queryFn: () => getUsers(),
    });
};

export const useUpdateStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }: any) => updateStatus(id, status),
        onSuccess: async () => {
            queryClient.invalidateQueries(["USERS"]);
        },
    });
};