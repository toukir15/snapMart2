"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";

export default function EditShopPage() {
  const [shopName, setShopName] = useState<string>(""); // Shop name state
  const [shopLogo, setShopLogo] = useState<File | null>(null); // Shop logo state
  const [shopLogoPreview, setShopLogoPreview] = useState<string>(""); // Shop logo preview
  const [description, setDescription] = useState<string>(""); // Shop description state

  // Fetch existing shop details (dummy fetch example, replace with actual API call)
  useEffect(() => {
    fetch("/api/shop/123") // Replace "123" with dynamic shop ID
      .then((res) => res.json())
      .then((data) => {
        setShopName(data.shopName);
        setDescription(data.description);
        setShopLogoPreview(data.shopLogo); // Assuming the API returns the logo URL
      })
      .catch((error) => {
        console.error("Error fetching shop details:", error);
      });
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setShopLogo(e.target.files[0]);
      setShopLogoPreview(URL.createObjectURL(e.target.files[0])); // Update preview
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("shopName", shopName);
    if (shopLogo) formData.append("shopLogo", shopLogo);
    formData.append("description", description);

    // Example API call (adjust based on your backend)
    fetch("/api/shop/123", {
      method: "PUT", // PUT for updating
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Shop updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating shop:", error);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300">
      <form onSubmit={handleSubmit}>
        <div className="bg-white w-[400px] xl:w-[600px] shadow-2xl rounded-2xl p-8 xl:px-12 py-20 flex flex-col items-center relative">
          {/* Decorative Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#cb4c11] via-[#fc69256a] to-[#ff5100] opacity-10 blur-lg rounded-2xl"></div>

          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Edit Your Shop
          </h3>

          {/* Shop Name */}
          <div className="flex flex-col w-full xl:w-3/4 mb-6">
            <Input
              variant="bordered"
              label="Shop Name"
              type="text"
              radius="sm"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="bg-gray-50"
              required
            />
          </div>

          {/* Shop Logo */}
          <div className="flex flex-col w-full xl:w-3/4 mb-6">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Shop Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="border border-gray-300 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            />
            {(shopLogo || shopLogoPreview) && (
              <div className="mt-4 flex items-center">
                <p className="text-sm text-gray-500 mr-4">Preview:</p>
                <Image
                  src={shopLogoPreview || ""}
                  alt="Shop Logo Preview"
                  width={60}
                  height={60}
                  className="rounded-full shadow-md"
                />
              </div>
            )}
          </div>

          {/* Shop Description */}
          <div className="flex flex-col w-full xl:w-3/4 mb-6">
            <Textarea
              variant="bordered"
              label="Shop Description"
              placeholder="Write a brief description of your shop"
              radius="sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-50"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full xl:w-3/4 py-3 bg-gradient-to-r from-[#F85606] to-[#ff2929] text-white rounded-xl font-bold shadow-md hover:scale-105 transform transition-transform duration-300"
          >
            Update Shop
          </Button>
        </div>
      </form>
    </div>
  );
}
