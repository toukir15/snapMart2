"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { IoMdClose } from 'react-icons/io';
import { Select } from 'antd';
import { useGetCategories } from "@/src/hooks/category.hook";
import { useCreateProduct } from "@/src/hooks/product.hook";
import { Toast } from "@/src/utils/toast";

export default function CreateProductForm({ setIsModalOpen, isCreateCategoryLoading }: any) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const { data } = useGetCategories();
    const { mutate, isSuccess, isError } = useCreateProduct()

    const categories = data?.data?.data?.map((category: any) => ({
        value: category.id,
        label: category.name
    })) || [];

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeImage = (index: number) => {
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (isSuccess) {
            Toast("success", "Created product successfully!")
        }
        if (isError) {
            Toast("error", "This product already created!")
        }
    }, [isSuccess, isError])

    const onSubmit = (data: FieldValues) => {
        const productData = {
            name: data.productName,
            price: data.price,
            quantity: data.quantity,
            discount: data.discount,
            description: data.description,
            categoryId: data.category
        };

        const formData = new FormData();
        const imageFiles = Array.from(data.images || []);
        formData.append("data", JSON.stringify(productData));
        imageFiles.forEach((file: any) => {
            formData.append("file", file);
        });
        mutate(formData);
    };


    return (
        <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full">
                <div className="mb-4 border-b py-3 flex items-center justify-between px-6">
                    <h2 className="text-lg font-semibold text-start">Create Product</h2>
                    <button onClick={() => setIsModalOpen(false)} className="p-1 bg-gray-100 hover:bg-gray-200 transition duration-200 text-gray-600 rounded-full">
                        <X size={18} />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="space-y-6 px-6 pb-6">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                {...register("productName", { required: "Product name is required" })}
                                placeholder="Product Name"
                                className="mt-1 block text-sm w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none border-gray-200"
                            />
                            <input
                                type="number"
                                {...register("price", { required: "Product price is required" })}
                                placeholder="Product Price"
                                className="mt-1 block text-sm w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none border-gray-200"
                            />
                        </div>

                        <div className="flex gap-4">
                            <input
                                type="number"
                                {...register("quantity", { required: "Product quantity is required" })}
                                placeholder="Product Quantity"
                                className="mt-1 block text-sm w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none border-gray-200"
                            />
                            <input
                                type="number"
                                {...register("discount")}
                                placeholder="Discount (Optional)"
                                className="mt-1 block text-sm w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none border-gray-200"
                            />
                        </div>

                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: "Category is required" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    size="large"
                                    style={{ width: "100%" }}
                                    placeholder="Select a Category"
                                    options={categories}
                                />
                            )}
                        />
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message as string}</p>}

                        <textarea
                            {...register("description", { required: "Description is required" })}
                            placeholder="Product Description"
                            rows={4}
                            className="mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none border-gray-200"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message as string}</p>}

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            {...register("images", { required: "At least one image is required" })}
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                        {errors.images && <p className="text-red-500 text-sm">{errors.images.message as string}</p>}

                        {imagePreviews.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <img src={preview} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded-md border" />
                                        <button
                                            type="button"
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                                            onClick={() => removeImage(index)}
                                        >
                                            <IoMdClose />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="py-4 border-t flex justify-end gap-2 px-6 text-sm">
                        <button onClick={() => setIsModalOpen(false)} className="w-fit py-2 px-4 font-medium bg-[#E2E8F0] text-[#4e5b6f] rounded-md shadow-sm hover:bg-[#e8edf3]">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isCreateCategoryLoading}
                            className="w-fit py-2 px-4 font-medium bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600"
                        >
                            {isCreateCategoryLoading ? "Creating..." : "Continue"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
