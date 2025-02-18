"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import authImg from "../../../public/auth.png";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";
import { useCreateCustomer, useCreateVendor } from "@/src/hooks/user.hook";
import { Toast } from "@/src/utils/toast";

export const userRoles = [
  { key: "vendor", label: "Vendor" },
  { key: "customer", label: "Customer" },
];

export default function LoginPage() {
  const { mutate: handleVendorMutate, isError: isVendorError, isSuccess: isVendorSuccess, isLoading: isVendorLoading } = useCreateVendor();
  const { mutate: handleCustomerMutate, isError: isCustomerError, isSuccess: isCustomerSuccess, isLoading: isCustomerLoading } = useCreateCustomer();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>("customer");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  console.log(errors)

  useEffect(() => {
    if (isVendorSuccess) {
      Toast("success", "Vendor register successfully!")
    }
    if (isCustomerSuccess) {
      Toast("success", "Customer register successfully!")
    }
  }, [isVendorSuccess, isCustomerSuccess]);

  useEffect(() => {
    if (isCustomerError || isVendorError) {
      Toast("error", "Something went wrong!")
    }
  }, [isCustomerError, isVendorError]);

  // Handle form submission
  const onSubmit = (data: FieldValues) => {
    const SignupData: any = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: selectedRole,
    };

    if (selectedRole === "vendor") {
      SignupData.shopName = data.shopName;
      SignupData.description = data.description
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(SignupData));
    formData.append("file", data.image[0]);
    if (selectedRole === "vendor") {
      handleVendorMutate(formData);
    }
    if (selectedRole === "customer") {
      handleCustomerMutate(formData)
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Left Side */}
      <div className="flex w-full h-screen lg:w-1/2 items-center justify-center px-8 lg:px-20 py-10 lg:py-0">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl text-gray-900 font-bold">Sign Up</h1>
            <p className="mt-2 text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                {...register("name", { required: "Name is required" })}
                type="text"
                radius="sm"
                label="Name"
                size="sm"
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message as string}
              />
            </div>
            <div>
              <Input
                {...register("email", { required: "Email is required" })}
                type="email"
                radius="sm"
                label="Email"
                size="sm"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message as string}
              />
            </div>
            {/* Logo Input */}
            <div>
              <input
                type="file"
                id="image"
                accept="image/*"
                {...register("image")}
                className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${errors.logo ? "border-red-500 focus:ring-red-500" : ""
                  }`}
              />
            </div>
            {/* Role Selection */}
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Select
                label="Register as a"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {userRoles.map((role) => (
                  <SelectItem key={role.key} value={role.key}>
                    {role.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Vendor হলে Shop Name দেখানো হবে */}
            {selectedRole === "vendor" && (
              <div>
                <Input
                  {...register("shopName", { required: "Shop Name is required" })}
                  type="text"
                  radius="sm"
                  label="Shop Name"
                  size="sm"
                  isInvalid={!!errors.shopName}
                  errorMessage={errors.shopName?.message as string}
                />
              </div>
            )}

            {selectedRole === "vendor" && (
              <div>
                <Textarea
                  {...register("description", { required: "Description is required" })}
                  type="text"
                  radius="sm"
                  label="Description"
                  size="sm"
                  isInvalid={!!errors.shopName}
                  errorMessage={errors.shopName?.message as string}
                />
              </div>
            )}

            <div>
              <Input
                {...register("password", { required: "Password is required" })}
                type="password"
                radius="sm"
                label="Password"
                size="sm"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message as string}
              />
            </div>
            <div className="flex items-center justify-between">
              <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <Button
              type="submit"
              className="w-full rounded-md bg-[#F85606] py-2 px-4 text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              isDisabled={isVendorLoading || isCustomerLoading}
            >
              {(isVendorLoading || isCustomerLoading) ? "Signing..." : "Sign Up"}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-gray-950 to-blue-950 items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-3xl lg:text-4xl font-bold mb-6">Welcome to SnapMart</h2>
          <p className="text-gray-300 text-base lg:text-lg mb-8 px-4 lg:px-10">
            A dashboard for managing portfolio content enables quick updates to
            projects, blogs, and skills without coding, keeping the portfolio dynamic and up-to-date.
          </p>
          <Image
            src={authImg}
            alt="Authentication Illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
