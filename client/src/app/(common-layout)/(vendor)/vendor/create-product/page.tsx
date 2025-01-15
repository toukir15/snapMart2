"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useCreateProduct } from "@/src/hooks/product.hook";
import PageLoading from "@/src/components/loading/PageLoading";
import { toast } from "sonner";
import ImageUploader from "@/src/components/pageComponents/CreateProduct/ImageUploader";
import { FormInput } from "@/src/components/pageComponents/CreateProduct/ProductInput";
import { DEPARTMENTS } from "@/src/const";
import { Category, Department, ProductFormData } from "@/src/types/createProduct";
import { Textarea } from "@nextui-org/input";
import { useGetCategories } from "@/src/hooks/category.hook";

const ProductForm = () => {
    const { mutate: handleCreateProduct, isLoading, isSuccess } = useCreateProduct();
    const [imagePreviews, setImagePreviews] = useState<{ file: File; preview: string }[]>([]);
    const [productFiles, setProductFiles] = useState<File[]>([]);
    const { data: categoryData } = useGetCategories();
    const categories: Category[] = categoryData?.data?.data.map(({ id, name }: { id: string, name: string }) => ({
        key: id,
        label: name,
    })) || [];

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        reset
    } = useForm<ProductFormData>({
        defaultValues: {
            flashSale: false,
        }
    });

    const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        productFiles.forEach((file) => formData.append("file", file));
        handleCreateProduct(formData);
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
                            setProductFiles((prev) => [...prev, ...newFiles]);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    };

    const removeImage = (fileToRemove: File) => {
        setImagePreviews((prev) => prev.filter((preview) => preview.file !== fileToRemove));
        setProductFiles((prev) => prev.filter((file) => file !== fileToRemove));
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Product created successfully!");
            reset()
            setImagePreviews([])
            setProductFiles([])
        }
    }, [isSuccess]);

    return (
        <>
            {isLoading && <PageLoading />}
            <div className="container mx-auto px-8 py-20 mt-[120px] flex justify-center items-center min-h-screen">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-3xl space-y-8 bg-[#F7F7F7] shadow-md rounded-2xl p-12 border border-gray-200"
                >
                    <h2 className="text-2xl font-bold mb-8 text-center text-gray-700">Add New Product</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-full">
                            <FormInput
                                name="name"
                                label="Product Name"
                                register={register}
                                error={errors.name}
                                required
                            />
                        </div>
                        <Controller
                            name="department"
                            control={control}
                            rules={{ required: "Department is required" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    items={DEPARTMENTS}
                                    label="Department"
                                    fullWidth
                                    variant="bordered"
                                    onChange={field.onChange}
                                    value={field.value}
                                    required
                                >
                                    {(department: Department) => (
                                        <SelectItem key={department.key} value={department.key}>
                                            {department.label}
                                        </SelectItem>
                                    )}
                                </Select>
                            )}
                        />
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: "Category is required" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    items={categories || []}
                                    label="Category"
                                    fullWidth
                                    variant="bordered"
                                    onChange={field.onChange}
                                    value={field.value}
                                    required
                                >
                                    {(category: Category) => (
                                        <SelectItem key={category.key} value={category.key}>
                                            {category.label}
                                        </SelectItem>
                                    )}
                                </Select>
                            )}
                        />
                        <FormInput
                            name="price"
                            label="Price"
                            type="number"
                            register={register}
                            error={errors.price}
                            required
                        />
                        <FormInput
                            name="rating"
                            label="Rating"
                            type="number"
                            register={register}
                            error={errors.rating}
                            required
                        />
                        <FormInput
                            name="model"
                            label="Model"
                            register={register}
                            error={errors.model}
                            required
                        />
                        <FormInput
                            name="styleCode"
                            label="Style Code"
                            register={register}
                            error={errors.styleCode}
                            required
                        />
                        <FormInput
                            name="color"
                            label="Color"
                            register={register}
                            error={errors.color}
                            required
                        />
                        <FormInput
                            name="inventoryCount"
                            label="Inventory Count"
                            type="number"
                            register={register}
                            error={errors.inventoryCount}
                            required
                        />
                        <div className="col-span-full">
                            <FormInput
                                name="discount"
                                label="Discount (%)"
                                type="number"
                                register={register}
                                error={errors.discount}
                                required
                            />
                        </div>

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
                            multiple={true}
                            required={true}
                        />
                        <div className="col-span-full">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-gradient-to-r from-orange-500 to-[#F85606] text-white font-semibold py-4"
                            >
                                Create Product
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProductForm;
