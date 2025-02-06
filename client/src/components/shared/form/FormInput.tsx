import { FieldValues, UseFormRegister } from "react-hook-form";

interface FormInputProps {
    label: string;
    id: string;
    type?: string;
    placeholder?: string;
    register: UseFormRegister<FieldValues>;
    errors: any;
    validationRules?: object;
}

export default function FormInput({
    label,
    id,
    type = "text",
    placeholder = "",
    register,
    errors,
    validationRules = {},
}: FormInputProps) {
    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-medium text-gray-600">
                {label}
            </label>
            <input
                type={type}
                id={id}
                {...register(id, validationRules)}
                placeholder={placeholder}
                className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none ${errors[id] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                    }`}
            />
            {errors[id] && (
                <p className="text-sm text-red-500 mt-1">{errors[id]?.message as string}</p>
            )}
        </div>
    );
}
