"use client";
import React, { useState } from "react";

export default function ProductSize() {
  const [selectedSize, setSelectedSize] = useState();
  return (
    <div className="mt-8">
      <h3 className="text-xl font-medium text-gray-700">Select Size</h3>
      <div className="flex flex-wrap mt-4 gap-4">
        {["7", "8", "9", "10", "11", "12"].map((size: any) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-4 py-2 border rounded ${selectedSize === size
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              } transition duration-150`}
          >
            {size}
          </button>
        ))}
      </div>
      {selectedSize && (
        <p className="mt-2 text-sm text-gray-600">
          Selected Size: {selectedSize}
        </p>
      )}
    </div>
  );
}
