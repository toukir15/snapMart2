import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdmins, getCustomers, getUsers, getVendors, updateStatus } from "../services/user";

export const useGetUsers = () => {
    return useQuery({
        queryKey: ["USERS"],
        queryFn: () => getUsers(),
    });
};

export const useGetAdmins = () => {
    return useQuery({
        queryKey: ["ADMINS"],
        queryFn: () => getAdmins(),
    });
};

export const useGetVendors = () => {
    return useQuery({
        queryKey: ["VENDORS"],
        queryFn: () => getVendors(),
    });
};

export const useGetCustomer = () => {
    return useQuery({
        queryKey: ["CUSTOMERS"],
        queryFn: () => getCustomers(),
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