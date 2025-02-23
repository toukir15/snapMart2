"use client";

import { CustomTable } from "@/src/components/shared/table/table";
import { shopsColumns } from "@/src/components/shared/table/table.const";
import { useGetShops, useUpdateStatus } from "@/src/hooks/shop.hook";
import { showConfirmation } from "@/src/utils/showConfirmation";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function UserManagementPage() {
    const { data: usersData, isLoading: isUserDataLoading } = useGetShops();
    const { mutate: handleUpdateStatus, isSuccess: isSuccessUpdateUser, data: updateStatusData } = useUpdateStatus();

    const handleBlock = (id: string) => {
        showConfirmation(
            "Block Shop",
            "Are you sure you want to block this shop?",
            () => handleUpdateStatus({ id, status: false })
        );
    };

    const handleActivate = (id: string) => {
        showConfirmation(
            "Activate Shop",
            "Are you sure you want to activate this shop?",
            () => handleUpdateStatus({ id, status: true })
        );
    };

    const actions = [
        {
            label: "Block",
            onClick: handleBlock,
            className:
                "bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white",
            disabled: (record: any) => record.isActive === false,
        },
        {
            label: "Activate",
            onClick: handleActivate,
            className:
                "bg-green-500 hover:bg-green-600 transition duration-150 py-1 px-3 rounded text-white",
            disabled: (record: any) => record.isActive === true,
        },
    ];

    useEffect(() => {
        if (isSuccessUpdateUser) {
            const { isActive } = updateStatusData?.data || {};
            if (isActive) {
                toast.success("Successfully activated shop!", { duration: 2000 });
            } else if (!isActive) {
                toast.success("Successfully block shop!", { duration: 2000 });
            }
        }
    }, [isSuccessUpdateUser, updateStatusData]);

    return (
        <>
            <div className="xl:px-4 lg:px-32 mt-8 lg:mt-20">
                <CustomTable
                    columns={shopsColumns}
                    data={usersData?.data?.data || []}
                    loading={isUserDataLoading}
                    actions={actions}
                    pageSize={12}
                />
            </div>
        </>
    );
}
