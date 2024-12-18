"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler, FieldValues } from "react-hook-form";
import { Button, Select, SelectItem } from "@nextui-org/react";
import PageLoading from "@/src/components/loading/PageLoading";
import { toast } from "sonner";
import ImageUploader from "@/src/components/pageComponents/CreateProduct/ImageUploader";
import { FormInput } from "@/src/components/pageComponents/CreateProduct/ProductInput";
import { DEPARTMENTS } from "@/src/const";
import { Category, Department, ProductFormData } from "@/src/types/createProduct";
import { Textarea } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useEditProduct } from "@/src/hooks/product.hook";

const EditForm = ({ productData, categoryData }: { productData: any, categoryData: any }) => {
    const { mutate: handleEditProduct, isLoading, isSuccess, isError, error } = useEditProduct();
    const [imagePreviews, setImagePreviews] = useState<{ file: File; preview: string }[]>([]);
    const [productFiles, setProductFiles] = useState<File[]>([]);
    const router = useRouter()
    const categories: Category[] = categoryData?.map(({ id, name }: { id: string, name: string }) => ({
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
    } = useForm<FieldValues>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        productFiles.forEach((file) => formData.append("file", file));
        handleEditProduct({ formData, productId: productData.id });
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
        if (!isError && isSuccess) {
            toast.success("Product edited successfully!");
            router.push("/vendor/products")
        }
    }, [isSuccess]);

    return (
        <>
            {isLoading && <PageLoading />}
            <div className="container mx-auto px-8 py-10 flex justify-center items-center min-h-screen">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-4xl bg-[#F7F7F7] shadow-md rounded-2xl p-12 border border-gray-200"
                >
                    <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Edit Product</h2>
                    <p className="text-center mb-12 text-rose-500">Edit existing product information.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-full">
                            <FormInput
                                name="name"
                                label="Product Name"
                                register={register}
                                error={errors.name}
                                defaultValue={productData?.name}
                                required={true}
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
                            name="categoryId"
                            control={control}
                            rules={{ required: "Category is required" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    items={categories}
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
                            defaultValue={productData?.price}
                            required={true}
                        />
                        <FormInput
                            name="rating"
                            label="Rating"
                            type="number"
                            register={register}
                            error={errors.rating}
                            defaultValue={productData?.rating}
                            required={true}
                        />
                        <FormInput
                            name="model"
                            label="Model"
                            register={register}
                            error={errors.model}
                            defaultValue={productData?.model}
                            required={true}
                        />
                        <FormInput
                            name="styleCode"
                            label="Style Code"
                            register={register}
                            error={errors.styleCode}
                            defaultValue={productData?.styleCode}
                            required={true}
                        />
                        <FormInput
                            name="color"
                            label="Color"
                            register={register}
                            error={errors.color}
                            defaultValue={productData?.color}
                            required={true}
                        />
                        <FormInput
                            name="inventoryCount"
                            label="Inventory Count"
                            type="number"
                            register={register}
                            error={errors.inventoryCount}
                            defaultValue={productData?.inventoryCount}
                            required={true}
                        />
                        <div className="col-span-full">
                            <FormInput
                                name="discount"
                                label="Discount (%)"
                                type="number"
                                register={register}
                                error={errors.discount}
                                defaultValue={productData?.discount}
                                required={true}
                            />
                        </div>

                        <div className="col-span-full">
                            <label className="flex items-center gap-2 w-fit">
                                <input
                                    {...register("isFlashSale")}
                                    type="checkbox"
                                    defaultChecked={productData?.isFlashSale}
                                    onChange={(e) => setValue("isFlashSale", e.target.checked)}

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
                                defaultValue={productData?.description}
                                rows={4}
                                required={true}
                            />
                        </div>

                        <ImageUploader
                            imagePreviews={imagePreviews}
                            onChange={handleImageChange}
                            onRemove={removeImage}
                            multiple={true}
                        />
                        <div className="col-span-full">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-gradient-to-r from-orange-500 to-[#F85606] text-white font-semibold py-4"
                            >
                                Edit Product
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditForm;
