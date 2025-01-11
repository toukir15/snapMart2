import { toast } from "sonner";

export const Toast = (status: string, message: string) => {
    if (status == "success") {
        toast.success(message, {
            duration: 2000,
            style: {
                background: "#ECFDF3",
                color: "#58B577",
            },
        });
    }
}