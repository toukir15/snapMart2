"use client";

import { CustomTable } from "@/src/components/shared/table/table";
import { usersColumns } from "@/src/components/shared/table/table.const";
import { useGetUsers, useUpdateStatus } from "@/src/hooks/user.hook";
import { showConfirmation } from "@/src/utils/showConfirmation";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function UserManagementPage() {
    const { data: usersData, isLoading: isUserDataLoading } = useGetUsers();
    const { mutate: handleUpdateStatus, isSuccess: isSuccessUpdateUser, data: updateStatusData } = useUpdateStatus();

    const handleDelete = (id: string) => {
        showConfirmation(
            "Delete",
            "Are you sure you want to delete this user?",
            () => handleUpdateStatus({ id, status: "DELETED" })
        );
    };

    const handleSuspend = (id: string) => {
        showConfirmation(
            "Suspend",
            "Are you sure you want to suspend this user?",
            () => handleUpdateStatus({ id, status: "BLOCKED" })
        );
    };

    const handleActivate = (id: string) => {
        showConfirmation(
            "Activate",
            "Are you sure you want to activate this user?",
            () => handleUpdateStatus({ id, status: "ACTIVE" })
        );
    };

    const actions = [
        {
            label: "Suspend",
            onClick: handleSuspend,
            className:
                "bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white",
            disabled: (record: any) => record.status === "BLOCKED" || record.status === "DELETED",
        },
        {
            label: "Delete",
            onClick: handleDelete,
            className:
                "bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white",
            disabled: (record: any) => record.status === "DELETED",
        },
        {
            label: "Activate",
            onClick: handleActivate,
            className:
                "bg-green-500 hover:bg-green-600 transition duration-150 py-1 px-3 rounded text-white",
            disabled: (record: any) => record.status === "ACTIVE" || record.status === "DELETED",
        },
    ];

    useEffect(() => {
        if (isSuccessUpdateUser) {
            const { status } = updateStatusData?.data?.data || {};
            if (status === "DELETED") {
                toast.success("Successfully deleted user!", { duration: 2000 });
            } else if (status === "BLOCKED") {
                toast.success("Successfully suspended user!");
            } else if (status === "ACTIVE") {
                toast.success("Successfully activated user!");
            }
        }
    }, [isSuccessUpdateUser, updateStatusData]);

    return (
        <div className="xl:px-4 lg:px-32 mt-8 lg:mt-20">
            <CustomTable
                columns={usersColumns}
                data={usersData?.data?.data || []}
                actions={actions}
                loading={isUserDataLoading}
                pageSize={12}
            />
        </div>
    );
}
