"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import authImg from "../../../public/auth.png"
import { useUserLogin } from "@/src/hooks/auth.hook";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { Toast } from "@/src/utils/toast";

export default function LoginPage() {
  const { mutate: handleLogin, error, isSuccess, isLoading } = useUserLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  useEffect(() => {
    if (error) {
      Toast("error", "Incorrect Credential!")
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
      Toast("success", "Login Successfully!")
    }
  }, [isSuccess]);

  // Handle form submission
  const onSubmit = (data: FieldValues) => {
    handleLogin(data);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Left Side */}
      <div className="flex w-full h-screen lg:w-1/2 items-center justify-center px-8 lg:px-20 py-10 lg:py-0">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl text-gray-900 font-bold ">
              Sign in
            </h1>
            <p className="mt-2 text-gray-600 ">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                {...register("email", { required: "Email is required" })}
                type="email"
                radius="sm"
                label="Email"
                size="sm"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              />

            </div>
            <div>
              <Input
                {...register("password", { required: "Password is required" })}
                type="password"
                radius="sm"
                label="Password"
                size="sm"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />
            </div>
            <div className="flex items-center justify-between">
              <a
                href="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Button
              type="submit"
              className="w-full rounded-md bg-[#F85606] py-2 px-4 text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              isDisabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-gray-950 to-blue-950 items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-3xl lg:text-4xl font-bold mb-6">
            Welcome to SnapMart
          </h2>
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
