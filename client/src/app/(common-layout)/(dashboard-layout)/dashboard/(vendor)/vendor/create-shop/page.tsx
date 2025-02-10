"use client";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { IoMdClose } from 'react-icons/io'
import FormInput from "@/src/components/shared/form/FormInput";
import { useCreateShop } from "@/src/hooks/shop.hook";

export default function CreateProductFormPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { mutate: handleCreateShop } = useCreateShop()
    const [imagePreviews, setImagePreviews] = useState([]);
    const [imageError, setImageError] = useState(false);

    const handleImageChange = (e: any) => {
        const files = Array.from(e.target.files);
        const previews: any = files.map((file: any) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeImage = (index: number) => {
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = (data: FieldValues) => {
        if (imagePreviews.length === 0) {
            setImageError(true);
        } else {
            setImageError(false);
        }

        if (!imageError) {
            const shopData = {
                name: data.name,
                description: data.description
            }
            const formData = new FormData()
            formData.append("data", JSON.stringify(shopData))
            formData.append("image", data.image[0])
            handleCreateShop(formData)
        }
    };

    return (
        <div className="flex justify-center px-8 my-10 bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg w-full">
                <div className="mb-4 border-b py-4 flex items-center justify-between px-6">
                    <h2 className="text-xl font-semibold text-start">Create Shop</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="space-y-8 px-6 pb-6">
                        <FormInput label="Shop Name" id="name" register={register} errors={errors} validationRules={{ required: "Shop name is required" }} placeholder="Enter shop name" />
                        {/* Description Input */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                                Description
                            </label>
                            <textarea
                                id="description"
                                {...register("description", { required: "Description is required" })}
                                placeholder="Enter shop description"
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.description
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                                    }`}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500 mt-1">{errors.description?.message as string}</p>
                            )}
                        </div>
                        {/* Product Image Upload with Preview & Remove Option */}
                        <div>
                            <label htmlFor="images" className="block text-sm font-medium text-gray-600">
                                Logo
                            </label>
                            <input
                                type="file"
                                id="images"
                                accept="image/*"
                                {...register("image", { required: "At least one image is required" })}
                                onChange={handleImageChange}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />

                            {imageError && (
                                <p className="text-sm text-red-500 mt-1">Image is required</p>
                            )}

                            {/* Image Previews */}
                            {imagePreviews.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <img src={preview} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-md border" />
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
                        <button type="submit" className="mt-4 font-medium transition duration-250 bg-orange-500 text-white px-12 py-3 rounded-md hover:bg-[#ff8133]">Create Shop</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
