"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Button } from "@nextui-org/react";
import PageLoading from "@/src/components/loading/PageLoading";
import { toast } from "sonner";
import ImageUploader from "@/src/components/pageComponents/CreateProduct/ImageUploader";
import { FormInput } from "@/src/components/pageComponents/CreateProduct/ProductInput";
import { Textarea } from "@nextui-org/input";
import { useCreateShop } from "@/src/hooks/shop.hook";

const CreateShop = () => {
  const { mutate: handleCreateShop, isLoading, isSuccess } = useCreateShop();
  const [imagePreviews, setImagePreviews] = useState<{ file: File; preview: string }[]>([]);
  const [shopFiles, setShopFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Import reset from useForm
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (shopFiles.length > 0) {
      formData.append("file", shopFiles[0]);
    }
    handleCreateShop(formData);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews: { file: File; preview: string }[] = [];
      const newFiles: File[] = [];

      Array.from(files).forEach((file) => {
        if (!imagePreviews.some((preview) => preview.file.name === file.name)) {
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreviews.push({ file, preview: reader.result as string });
            newFiles.push(file);

            if (newPreviews.length === files.length) {
              setImagePreviews((prev) => [...prev, ...newPreviews]);
              setShopFiles((prev) => [...prev, ...newFiles]);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removeImage = (fileToRemove: File) => {
    setImagePreviews((prev) => prev.filter((preview) => preview.file !== fileToRemove));
    setShopFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Shop created successfully!");
      reset(); // Reset form fields
      setImagePreviews([]); // Clear image previews
      setShopFiles([]); // Clear uploaded files
    }
  }, [isSuccess, reset]);

  return (
    <>
      {isLoading && <PageLoading />}
      <div className="container pt-[120px]  px-8 flex justify-center items-center min-h-screen ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl space-y-8 bg-[#F7F7F7] shadow-md rounded-2xl p-12 border border-gray-200"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create Shop</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <FormInput
                name="name"
                label="Brand Name"
                register={register}
                error={errors.name}
                required
              />
            </div>

            <div className="col-span-full">
              <Textarea
                {...register("description")}
                label="Description"
                variant="bordered"
                fullWidth
                rows={4}
                required
              />
            </div>

            <ImageUploader
              imagePreviews={imagePreviews}
              onChange={handleImageChange}
              onRemove={removeImage}
              multiple={false}
            />
            <p className="w-full text-xs text-rose-500">e.g First create shop after create product.</p>
            <div className="col-span-full">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-[#F85606] text-white font-semibold py-4"
              >
                Create Shop
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateShop;
