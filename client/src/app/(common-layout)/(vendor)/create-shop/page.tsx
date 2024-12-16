"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { IoCloseSharp } from "react-icons/io5";

// Image Preview Interface
interface ImagePreview {
  file: File;
  preview: string;
}

export default function CreateShopPage() {
  // State for image preview
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(null);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // Form submission handler
  const onSubmit = async (data: any) => {
    // Create FormData for file uploads
    const formData = new FormData();
    formData.append("shopName", data.shopName);
    formData.append("description", data.description || "");

    // Add single file to FormData if exists
    if (imagePreview) {
      formData.append("shopLogo", imagePreview.file);
    }

    // TODO: Implement actual API call
    console.log("Form submitted", formData);
  };

  // Image handling function
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Replace any existing preview with the new image
        setImagePreview({
          file,
          preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image from preview
  const removeImage = () => {
    setImagePreview(null);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white w-[400px] xl:w-[600px] shadow-2xl rounded-2xl p-8 xl:px-12 py-20 flex flex-col items-center relative">
          {/* Decorative Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#cb4c11] via-[#fc69256a] to-[#ff5100] opacity-10 blur-lg rounded-2xl"></div>

          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Create Your Shop
          </h3>

          {/* Shop Name */}
          <div className="flex flex-col w-full xl:w-3/4 mb-6">

            <Input
              {...register("brandName")}
              variant="bordered"
              label="Brand Name"
              type="text"
              radius="sm"
              className="bg-gray-50"
              color={errors.shopName ? "danger" : "default"}
              // errorMessage={errors.shopName?.message}
              required
            />
          </div>

          {/* Shop Logo / Image Upload */}
          <div className="flex flex-col w-full xl:w-3/4 mb-6">
            <div className="space-y-4">
              <Input
                type="file"
                accept="image/*"
                fullWidth
                onChange={handleImageChange}
                variant="bordered"
              />

              {/* Single Image Preview */}
              {imagePreview && (
                <div className="relative group w-full max-w-[100px] mt-4">
                  <img
                    src={imagePreview.preview}
                    alt="Shop Logo Preview"
                    className="w-full h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <IoCloseSharp />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Shop Description */}
          <div className="flex flex-col w-full xl:w-3/4 mb-6">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  fullWidth
                  variant="bordered"
                  color={errors.description ? "danger" : "default"}
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full xl:w-3/4 py-3 bg-gradient-to-r from-[#F85606] to-[#ff2929] text-white rounded-xl font-bold shadow-md hover:scale-105 transform transition-transform duration-300"
          >
            Create Shop
          </Button>
        </div>
      </form>
    </div>
  );
}