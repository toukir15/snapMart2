"use client";
import { useCreateCategory } from "@/src/hooks/category.hook";
import { Toast } from "@/src/utils/toast";
import { FolderOpenDot } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";

const CreateCategoryForm = ({ setIsModalOpen }: any) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { mutate: handleCreateCategory, isSuccess: isCreateCategorySuccess, isLoading: isCreateCategoryLoading, isError, error } = useCreateCategory()

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    const onSubmit = (data: FieldValues) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify({ name: data.name }));
        if (selectedImage) {
            formData.append("file", selectedImage);
        }
        handleCreateCategory(formData)
        reset();
    };

    useEffect(() => {
        if (isCreateCategorySuccess) {
            Toast("success", "Created category successfully!")
            setIsModalOpen(false)
            reset();
        }
    }, [isCreateCategorySuccess])

    return (
        <div className="bg-white rounded-lg  w-full">
            <div className=" border-b py-4 flex items-center justify-between px-6">
                <h2 className=" text-lg font-semibold text-start">Create Category</h2>

            </div>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="space-y-4 p-6">
                    {/* Brand Name Input */}
                    <div>
                        <label
                            htmlFor="brandName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            required
                            id="name"
                            {...register("name", { required: "Brand name is required" })}
                            placeholder="Enter category name"
                            className={`mt-1 block text-sm w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none ${errors.name
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-200 "
                                }`}
                        />
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
                        disabled={isCreateCategoryLoading}
                        className="w-fit py-2 px-4 font-medium bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none  transition duration-200"
                    >
                        {isCreateCategoryLoading ? "Creating..." : "Continue"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCategoryForm;
