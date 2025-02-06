"use client";
import { useState } from "react";
import { Select } from "antd";
import { FieldValues, useForm, Controller } from "react-hook-form";
import FormInput from "../../shared/form/FormInput";
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io'

export default function CreateProductForm({ brandsData }: { brandsData: TBrand[] }) {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    const brandSelect = brandsData.map(brand => ({ value: brand.id, label: brand.name }));
    const [imagePreviews, setImagePreviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [ratingError, setRatingError] = useState(false);

    const handleImageChange = (e: any) => {
        const files = Array.from(e.target.files);
        const previews: any = files.map((file: any) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeImage = (index: number) => {
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleRatingClick = (value: number) => {
        setRating(value);
        setValue("rating", value);
    };

    const onSubmit = (data: FieldValues) => {
        if (imagePreviews.length === 0) {
            setImageError(true);
        } else {
            setImageError(false);
        }

        if (rating < 1) {
            setRatingError(true);
        } else {
            setRatingError(false);
        }

        if (!imageError && !ratingError) {
            console.log("Form Data:", data);
        }
    };

    return (
        <div className="flex justify-center px-8 my-10 bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg w-full">
                <div className="mb-4 border-b py-4 flex items-center justify-between px-6">
                    <h2 className="text-xl font-semibold text-start">Create Product</h2>
                    <button type="submit" className="font-medium transition duration-250 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-[#ff8133]">Manage Products</button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="space-y-8 px-6 pb-6">
                        <FormInput label="Product Name" id="productName" register={register} errors={errors} validationRules={{ required: "Product name is required" }} placeholder="Enter product name" />
                        <div className="flex gap-6">
                            <FormInput label="Price" id="price" type="number" register={register} errors={errors} validationRules={{ required: "Price is required" }} placeholder="Enter price" />
                            <FormInput label="Color" id="color" register={register} errors={errors} validationRules={{ required: "Color is required" }} placeholder="Enter color" />
                        </div>
                        <div className="flex gap-6">
                            <div className="w-1/2">
                                <FormInput label="Inventory Count" id="inventoryCount" type="number" register={register} errors={errors} validationRules={{ required: "Inventory count is required" }} placeholder="Enter inventory count" />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                                    Ratings
                                </label>
                                <div className="flex mt-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className="focus:outline-none"
                                            onClick={() => handleRatingClick(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        >
                                            {star <= (hoverRating || rating) ? (
                                                <AiFillStar className="text-[26px] text-orange-500" />
                                            ) : (
                                                <AiOutlineStar className="text-[26px] text-gray-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                {ratingError && (
                                    <p className="text-sm text-red-500 mt-1">Rating is required</p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <FormInput label="Style Code" id="styleCode" register={register} errors={errors} validationRules={{ required: "Style code is required" }} placeholder="Enter style code" />
                            <FormInput label="Department" id="department" register={register} errors={errors} validationRules={{ required: "Department is required" }} placeholder="Enter department" />
                        </div>
                        <div className="flex gap-6">
                            {/* Brand Dropdown */}
                            <div className="w-full">
                                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                                    Brand
                                </label>
                                <Controller
                                    name="brand"
                                    control={control}
                                    rules={{ required: "Brand is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            className="w-full rounded-md border border-gray-300 shadow-sm"
                                            showSearch
                                            placeholder="Select a brand"
                                            filterOption={(input, option) =>
                                                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={brandSelect}
                                            style={{ height: "47px" }}
                                            onChange={(value) => field.onChange(value)}
                                        />
                                    )}
                                />
                                {errors.brand && (
                                    <p className="text-sm text-red-500 mt-1">{errors.brand.message as string}</p>
                                )}
                            </div>
                            <FormInput label="Model" id="model" register={register} errors={errors} validationRules={{ required: "Model is required" }} placeholder="Enter model" />
                        </div>
                        {/* Description Input */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                                Description
                            </label>
                            <textarea
                                id="description"
                                {...register("description", { required: "Description is required" })}
                                placeholder="Enter product description"
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
                                Product Images
                            </label>
                            <input
                                type="file"
                                id="images"
                                accept="image/*"
                                multiple
                                {...register("images", { required: "At least one image is required" })}
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
                        <button type="submit" className="mt-4 font-medium transition duration-250 bg-orange-500 text-white px-12 py-3 rounded-md hover:bg-[#ff8133]">Create Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
