"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { RadioGroup, Radio } from "@nextui-org/radio";
import logo from "../../../public/logo.png";

import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Logo } from "@/src/components/icons";

export default function SignupPage() {
  const [role, setRole] = useState<"user" | "vendor">("user"); // Role selector state
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const router = useRouter();

  // Handle file changes for image preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imagePreview = reader.result as string;
        setFiles([file]);
        setImagePreviews([imagePreview]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "vendor") {
      router.push("/vendor/dashboard"); // Redirect to dashboard for vendors
    } else {
      router.push("/user/home"); // Redirect to home for users
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="xl:bg-[#F7F7F7] w-[400px] xl:w-[600px] shadow-lg py-[30px] rounded-2xl flex justify-center items-center flex-col">
          <Logo size={48} color={"black"} />
          <h3 className="text-2xl font-medium mb-8">SnapMart</h3>

          {/* Name Field */}
          <div className="flex flex-col w-4/5 md:w-3/5 mb-4 xl:mb-6">
            <Input variant="bordered" label="Name" radius="sm" required />
          </div>

          {/* Email Field */}
          <div className="flex flex-col w-4/5 md:w-3/5 mb-4 xl:mb-6">
            <Input
              variant="bordered"
              label="Email"
              type="email"
              radius="sm"
              required
            />
          </div>

          {/* Profile Photo Field */}
          <div className="flex items-center mb-6 gap-4 w-4/5 md:w-3/5 ">
            <div>
              <label
                htmlFor="profilePhoto"
                className="border w-fit py-2 px-4 rounded-full border-[#FE5417] cursor-pointer text-[#FE5417] text-sm"
              >
                Profile photo
              </label>
              <input
                type="file"
                id="profilePhoto"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {imagePreviews.map((src, idx) => (
                  <div key={idx} className="h-20 w-20 border border-dashed p-2">
                    <img className="w-full h-full" alt="preview" src={src} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col w-4/5 md:w-3/5 mb-4 xl:mb-6">
            <Input
              variant="bordered"
              label="Password"
              type="password"
              radius="sm"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col w-4/5 md:w-3/5 mb-4 xl:mb-6">
            <Input
              variant="bordered"
              label="Confirm Password"
              type="password"
              radius="sm"
              required
            />
          </div>

          {/* Address Field */}
          <div className="flex flex-col w-4/5 md:w-3/5 mb-4 xl:mb-6">
            <Input variant="bordered" label="Address" radius="sm" required />
          </div>

          {/* Role Selector */}
          <div className="flex flex-col w-4/5 md:w-3/5 mb-4 xl:mb-6 text-sm">
            {/* <RadioGroup
              value={role}
              onValueChange={(value: any) => setRole(value)}
              label="Register as:"
              orientation={"horizontal"}
              color="warning"
            >
              <Radio value="user">User</Radio>
              <Radio value="vendor">Vendor</Radio>
            </RadioGroup> */}
          </div>

          <Button
            type="submit"
            size="md"
            className="w-4/5 md:w-3/5 bg-[#FE5417] px-12 rounded-xl font-bold mt-2"
          >
            Sign Up
          </Button>

          <p className="text-[#b5b4b4] mt-3 md:mt-4">
            Already have an account?{" "}
            <Link
              href={`/login`}
              className="hover:cursor-pointer hover:underline hover:text-[#959595]"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
