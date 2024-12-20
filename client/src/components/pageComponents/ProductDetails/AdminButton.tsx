"use client"
import { useDeleteProduct } from '@/src/hooks/product.hook'
import { showConfirmation } from '@/src/utils/showConfirmation'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

export default function AdminButton({ productData }: any) {
    const router = useRouter()
    const { mutate: handleDeleteProduct, isSuccess: isProductDeleteSuccess } = useDeleteProduct()
    const handleDelete = (id: string) => {
        showConfirmation(
            "Delete",
            "Are you want to delete this product",
            () => handleDeleteProduct(id)
        )
    };

    useEffect(() => {
        if (isProductDeleteSuccess) {
            toast.success("Product deleted successfully!")
            router.push(`/`)
        }
    }, [isProductDeleteSuccess])

    return (
        <div className="flex gap-3 mt-10">
            <Button onClick={() => handleDelete(productData.id)} radius="sm" className="bg-red-500  text-white px-52">Delete</Button>
        </div>
    )
}
