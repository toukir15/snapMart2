import { Input } from "@nextui-org/input";

export const FormInput = ({ name, label, type = "text", register, error, required = false }: any) => (
    <div>
        <Input
            {...register(name, { required: required && `${label} is required` })}
            label={label}
            type={type}
            fullWidth
            variant="bordered"
            color={error && "danger"}
            errorMessage={error?.message}
            required
        />
    </div>
);
