"use client";
import React, { useEffect, useState } from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { Input, Button, Textarea, Select, SelectItem, Checkbox } from "@nextui-org/react";
import { IoCloseSharp } from "react-icons/io5";
import { useCreateProduct } from '@/src/hooks/product.hook';
import { useGetCategory } from '@/src/hooks/category.hook';
import PageLoading from '@/src/components/loading/PageLoading';
import { toast } from 'sonner';

export const departments = [
    { key: "Men", label: "Men" },
    { key: "Women", label: "Women" },
    { key: "Kids", label: "Kids" },
];

interface ImagePreview {
    file: File;
    preview: string;
}

const ProductForm = () => {
    const { mutate: handleCreateProduct, isLoading, isSuccess, error } = useCreateProduct();
    const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
    const [productFile, setProductFile] = useState<File[]>([]);
    const { data } = useGetCategory()
    const categories = data?.data.data.map((category: any) => ({
        key: category.id,
        label: category.name,
    }));

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: FieldValues) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        productFile.forEach((file: any) => {
            formData.append("file", file);
        });
        console.log("call")
        handleCreateProduct(formData);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newPreviews: ImagePreview[] = [];
            const newFiles: File[] = [];

            Array.from(files).forEach((file) => {
                if (!imagePreviews.some((preview) => preview.file.name === file.name)) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        newPreviews.push({
                            file,
                            preview: reader.result as string,
                        });
                        newFiles.push(file);

                        if (newPreviews.length === files.length) {
                            setImagePreviews((prev) => [...prev, ...newPreviews]);
                            setProductFile((prev) => [...prev, ...newFiles]);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    };

    const removeImage = (fileToRemove: File) => {
        setImagePreviews((prev) => prev.filter((preview) => preview.file !== fileToRemove));
        setProductFile((prev) => prev.filter((file) => file !== fileToRemove));
        setValue("image", null);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Product created successfully!")
        }
    }, [isSuccess])

    return (
        <>
            {isLoading && <PageLoading />}
            <div className="container mx-auto px-8 pt-[120px] my-28 flex justify-center items-center min-h-screen ">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-5xl space-y-8 bg-white shadow-md rounded-2xl p-12 border border-gray-200"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                        Add New Product
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Name */}
                        <div className="col-span-full">
                            <Input
                                {...register("name")}
                                label="Product Name"
                                fullWidth
                                color={errors.name ? "danger" : "default"}
                                errorMessage={errors.name?.message as string}
                                className="text-lg"
                            />
                        </div>

                        {/* Department */}
                        <div className="col-span-full">
                            <Controller
                                name="department"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        items={departments}
                                        label="Department"
                                        fullWidth
                                        onChange={(value) => field.onChange(value)}
                                        value={field.value}
                                    >
                                        {(department: any) => (
                                            <SelectItem key={department.value} value={department.value}>
                                                {department.label}
                                            </SelectItem>
                                        )}
                                    </Select>
                                )}
                            />
                        </div>
                        {/* Category */}
                        <div className="col-span-full">
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        items={categories || []}
                                        label="Category"
                                        fullWidth
                                        onChange={(value) => field.onChange(value)}
                                        value={field?.value}
                                    >
                                        {(category: any) => (
                                            <SelectItem key={category?.value} value={category?.value}>
                                                {category?.label}
                                            </SelectItem>
                                        )}
                                    </Select>
                                )}
                            />
                        </div>

                        {/* Other Inputs */}
                        <Input {...register("price")} type="number" label="Price" fullWidth />
                        <Input {...register("brand")} label="Brand" fullWidth />
                        <Input {...register("rating")} type="number" label="Rating" fullWidth />
                        <Input {...register("model")} label="Model" fullWidth />
                        <Input {...register("styleCode")} label="Style Code" fullWidth />
                        <Input {...register("color")} label="Color" fullWidth />
                        <Input {...register("inventoryCount")} type="number" label="Inventory Count" fullWidth />
                        <Input {...register("discount")} type="number" label="Discount (%)" fullWidth />
                        {/* Flash Sale Checkbox */}
                        <div className="col-span-full">
                            <label className="flex items-center gap-2 w-fit">
                                <input
                                    {...register("flashSale")}
                                    type="checkbox"
                                    onChange={(e) => setValue("flashSale", e.target.checked)}
                                />
                                <span className="text-gray-600 text-sm">Flash Sale</span>
                            </label>
                        </div>

                        {/* Description */}
                        <div className="col-span-full">
                            <Textarea
                                {...register("description")}
                                label="Description"
                                fullWidth
                                rows={4}
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="col-span-full">
                            <Input type="file" multiple accept="image/*" onChange={handleImageChange} />
                            <div className="grid grid-cols-4 gap-4 mt-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={`${preview.file.name}-${index}`} className="relative group">
                                        <img
                                            src={preview.preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(preview.file)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <IoCloseSharp />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-full">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-gradient-to-r from-orange-500 to-[#F85606] text-white font-semibold py-4"
                            >
                                Submit Product
                            </Button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    );
};

export default ProductForm;
