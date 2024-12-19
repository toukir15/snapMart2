import { Button } from '@nextui-org/button'
import React from 'react'
import { FaHeart } from 'react-icons/fa'

export default function page() {
    return (
        <div>
            <div className="flex items-center gap-4">
                <img
                    src="https://via.placeholder.com/100"
                    alt="Shop Logo"
                    className="w-16 h-16 rounded-full"
                />
                <div>
                    <h1 className="text-2xl font-semibold">Jordan's Shoes</h1>
                    <p className="text-sm text-gray-600">
                        High-quality shoes for every occasion.
                    </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <FaHeart className="text-orange-500" size={20} />
                    <span className="text-gray-700">1234 Followers</span>
                </div>
            </div>

            {/* Shop Actions */}
            <div className="mt-4 flex gap-4">
                <Button className="px-4 py-2 bg-green-600 text-white rounded ">
                    Shop Edit
                </Button>
                <Button className="px-4 py-2 bg-orange-600 text-white rounded">
                    Reviews
                </Button>
            </div>
        </div>
    )
}
