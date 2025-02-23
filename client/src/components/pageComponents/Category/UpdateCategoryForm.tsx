"use client";
import { useEditCategory } from "@/src/hooks/category.hook";
import { ICategory } from "@/src/types/category";
import { Toast } from "@/src/utils/toast";
import { FolderOpenDot } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";

const UpdateCategoryForm = ({ setIsModalOpen, selectedCategory }: { setIsModalOpen: any, selectedCategory: ICategory | null }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { mutate: handleEditCategory, isLoading, isSuccess } = useEditCategory()

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };


    const onSubmit = async (data: FieldValues) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify({ name: data.name }));
        if (selectedImage) {
            formData.append("file", selectedImage);
        }

        handleEditCategory({ id: selectedCategory?.id, data: formData })
    };

    useEffect(() => {
        if (isSuccess) {
            Toast("success", "Edited category successfully!")
            setIsModalOpen(false)
            reset();
        }
    }, [isSuccess])

    return (
        <div className="flex justify-center ">
            <div className="bg-white rounded-lg shadow-lg w-full">
                <div className=" mb-4 border-b py-4 flex items-center justify-between px-6">
                    <h2 className=" text-lg font-semibold text-start">Edit Category</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="space-y-4 px-6 pb-6">
                        <div>
                            <label
                                htmlFor="brandName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register("name", {
                                    required: "Category name is required",
                                })}
                                defaultValue={selectedCategory?.name}
                                placeholder="Enter brand name"
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.brandName
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                                    }`}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.name?.message as string}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 ">Upload Profile</label>
                            <div className="border-dashed border  border-gray-300 rounded p-4 text-center  relative cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageChange}
                                    className="absolute  inset-0 opacity-0 cursor-pointer"
                                    required
                                />

                                <div className="flex gap-4 items-center h-full">
                                    <div className='bg-[#F6F7F8] p-4 rounded-full text-gray-400'>
                                        <FolderOpenDot size={22} />
                                    </div>
                                    <div className='text-start'>
                                        <p className='text-[#808390] font-medium'>Upload your files</p>
                                        <p className='text-[#BABFC4] text-sm'>Click to browse JPG or PNG formats.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Selected File Details */}
                        {selectedImage && (
                            <div className="flex items-center justify-between bg-gray-100 border rounded-lg px-4 py-2 ">
                                <div>
                                    <p className="text-gray-700">{selectedImage.name.length > 15 ? `${selectedImage.name.slice(0, 15)}...` : selectedImage.name}</p>
                                    <p className="text-xs text-gray-500">{(selectedImage.size / 1024).toFixed(2)} MB</p>
                                </div>
                                <button onClick={handleRemoveImage}>
                                    <AiOutlineDelete className="w-5 h-5 text-gray-500 hover:text-red-500" />
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Submit Button */}
                    <div className="py-4 border-t flex gap-2 px-6 text-sm">
                        <button onClick={() => setIsModalOpen(false)} className="w-fit py-2 px-4 font-medium bg-[#E2E8F0] text-[#4e5b6f] rounded-md shadow-sm hover:bg-[#e8edf3] focus:outline-none  transition duration-200">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-fit py-2 px-4 font-medium bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none  transition duration-200"
                        >
                            {isLoading ? "Edating..." : "Continue"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCategoryForm;
