"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import logo from "../../../public/logo.png";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

export default function LoginPage() {
  const { mutate: handleLogin, error, isSuccess } = useUserLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  useEffect(() => {
    if (error) {
      toast.error("Incorrect Credential!", { duration: 2000 });
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
      toast.success("Login Successfully!", { duration: 2000 });
    }
  }, [isSuccess]);

  // Handle form submission
  const onSubmit = (data: { email: string; password: string }) => {
    handleLogin(data);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="xl:bg-[#F7F7F7] w-[400px] xl:w-[600px] shadow-lg py-[80px] rounded-2xl flex justify-center items-center flex-col">
          <Image
            src={logo} // Replace with your logo
            width={300}
            height={300}
            alt="logo"
            className="w-16 mb-4"
          />
          <h3 className="text-2xl font-medium mb-8">SnapMart</h3>

          {/* Email Field */}
          <div className="flex flex-col w-4/5 md:w-3/5 mb-4 xl:mb-6">
            <Input
              {...register("email", { required: "Email is required" })}
              variant="bordered"
              label="Email"
              type="email"
              radius="sm"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col w-4/5 md:w-3/5 mb-4 xl:mb-6">
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              variant="bordered"
              label="Password"
              type="password"
              radius="sm"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-4/5 md:w-3/5 py-[10px] bg-[#FE5417] px-12 rounded-xl font-bold mt-2"
          >
            Login
          </Button>

          <p className="text-[#b5b4b4] mt-3 md:mt-4">
            Don't have an account?{" "}
            <Link
              href={`/signup`}
              className="hover:cursor-pointer hover:underline hover:text-[#959595]">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
