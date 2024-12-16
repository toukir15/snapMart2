import React from 'react'

export default function OrderSummeryLoading() {
    return (
        <div className="border border-gray-200 rounded-lg p-4 h-fit animate-pulse">
            {/* Title */}
            <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>

            {/* Subtotal */}
            <div className="flex justify-between mb-2">
                <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
            </div>

            {/* Shipping Fee */}
            <div className="flex justify-between mb-2">
                <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
            </div>

            {/* Total */}
            <div className="flex justify-between font-semibold mb-4">
                <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                <div className="h-5 w-1/6 bg-gray-300 rounded "></div>
            </div>

            {/* Button */}
            <div className="w-full h-10 bg-gray-300 rounded-lg"></div>
        </div>
    )
}
