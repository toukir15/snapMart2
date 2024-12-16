import { calculateDiscounnt } from '@/src/utils/calculateDiscount'
import React from 'react'

export default function ProductDetails({ data }: any) {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
                <p className="text-sm text-gray-500">Colorway</p>
                <p className="mt-1 text-gray-800">{data.color}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500">Available Stock</p>
                <p className="mt-1 text-gray-800">{data.inventoryCount}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="mt-1 text-gray-800">
                    ৳{calculateDiscounnt(data.price, data.discount)}
                </p>
            </div>
        </div>
    )
}
