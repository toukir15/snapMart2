"use client"
import { useDeleteProduct } from '@/src/hooks/product.hook'
import { IProduct } from '@/src/types/product'
import { showConfirmation } from '@/src/utils/showConfirmation'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

export default function VendorButtons({ productData }: any) {
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
            router.push(`/vendor/shop/${productData.shopId}`)
        }
    }, [isProductDeleteSuccess])

    return (
        <div className="flex gap-3 mt-10">
            <Link href={`/vendor/edit-product/${productData.id}`}>
                <Button radius="sm" color="success" className="text-white px-8" >Edit</Button>
            </Link>
            <Link href={`/vendor/duplicate-product/${productData.id}`}>
                <Button radius="sm" className="bg-indigo-500 text-white px-8">Duplicate</Button>
            </Link>
            <Button onClick={() => handleDelete(productData.id)} radius="sm" className="bg-red-500 text-white px-8">Delete</Button>
        </div>
    )
}
