import React from 'react'

export default function ProductPageLoading() {
    return (
        <div className="flex flex-wrap">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="w-[220px] border p-2 rounded bg-gray-100 animate-pulse"
                >
                    <div className="md:h-[200px] bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    )
}
