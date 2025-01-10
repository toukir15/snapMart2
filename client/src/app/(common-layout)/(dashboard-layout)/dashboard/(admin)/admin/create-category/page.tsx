"use client"
import React, { useState } from "react";

const CreateBrand = () => {
    const [brandName, setBrandName] = useState("");
    const [logo, setLogo] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Handle the form submission
        console.log("Brand Name:", brandName);
        console.log("Logo:", logo);

        // Reset form
        setBrandName("");
        setLogo(null);
    };

    return (
        <div className=" flex justify-center px-8 bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg w-full ">
                <div className="text-xl font-semibold text-start mb-4 border-b py-4">
                    <h2 className="px-6">Create Brand</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-8">
                    {/* Brand Name Input */}
                    <div>
                        <label
                            htmlFor="brandName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Brand Name
                        </label>
                        <input
                            type="text"
                            id="brandName"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            placeholder="Enter brand name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            required
                        />
                    </div>

                    {/* Logo Input */}
                    <div>
                        <label
                            htmlFor="logo"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Brand Logo
                        </label>
                        <input
                            type="file"
                            id="logo"
                            accept="image/*"
                            onChange={(e) => setLogo(e.target.files[0])}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-fit py-2 px-4 bg-orange-600 text-white rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        Create Brand
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBrand;
