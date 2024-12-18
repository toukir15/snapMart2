import { Input } from "@nextui-org/input";
import { FieldValues, UseFormRegister, FieldError } from "react-hook-form";

// Define the type for the props
interface FormInputProps {
    name: string;
    label: string;
    type?: "text" | "email" | "password" | "number" | "tel" | "url"; // You can extend this as needed
    defaultValue?: string;
    register: any;
    error?: any;
    required?: boolean;
}

export const FormInput = ({
    name,
    label,
    type = "text",
    defaultValue,
    register,
    error,
    required = false,
}: FormInputProps) => (
    <div>
        <Input
            {...register(name, { required: required && `${label} is required` })}
            label={label}
            type={type}
            fullWidth
            variant="bordered"
            color={error ? "danger" : undefined}
            errorMessage={error?.message}
            required={required}
            defaultValue={defaultValue}
        />
    </div>
);
