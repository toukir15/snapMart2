import { toast } from "sonner";

export const Toast = (status: string, message: string) => {
    if (status === "success") {
        toast.success(message, {
            duration: 2000,
            style: {
                background: "#ECFDF3",
                color: "#58B577",
            },
        });
    } else if (status === "error") {
        toast.error(message, {
            duration: 2000,
            style: {
                background: "#FDEDED",
                color: "#D14343",
            },
        });
    }
};
