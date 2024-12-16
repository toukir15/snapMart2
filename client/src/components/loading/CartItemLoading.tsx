import React from 'react'

export default function CartItemLoading() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((_, index: any) => (
                <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-100 rounded-md animate-pulse"
                >
                    {/* Left Section: Image and Text */}
                    <div className="flex items-center gap-4">
                        {/* Skeleton for image */}
                        <div className="w-20 h-20 bg-gray-300 rounded-md"></div>

                        {/* Skeleton for text */}
                        <div className="flex flex-col space-y-2">
                            <div className="w-32 h-4 bg-gray-300 rounded"></div>
                            <div className="w-20 h-3 bg-gray-300 rounded"></div>
                        </div>
                    </div>

                    {/* Right Section: CartAction */}
                    <div className="flex flex-col space-y-2 items-end">
                        <div className="w-16 h-6 bg-gray-300 rounded"></div>
                        <div className="w-12 h-3 bg-gray-300 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}
