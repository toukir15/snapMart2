"use client"
import React, { useState } from 'react';
import profile1 from "../../../../../../../../public/profile1.png"
import Image from 'next/image';
import { AiOutlineDelete, AiOutlineFileImage, AiOutlineMail } from "react-icons/ai";
import { BiCreditCardFront } from 'react-icons/bi';
import { CiLocationOn } from "react-icons/ci";
import { FolderOpenDot } from 'lucide-react';

const UserProfile = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className='bg-white'>
                {/* Header */}
                <div className="bg-white p-6 rounded-2xl">
                    <h1 className="text-2xl font-medium mb-4">My Profile</h1>
                    <div className="flex gap-3 items-center">
                        <Image
                            src={profile1}
                            alt="Profile"
                            className=" w-28 h-28 object-cover mr-4"
                        />
                        <div>
                            <h2 className="text-xl font-bold">
                                Moinul Islam<span className="text-[#808390]">Owner of Moinul's Tech</span>
                            </h2>
                            <div className='flex mt-3 gap-5 text-[#808390]'>
                                <div className='flex items-center gap-1'>
                                    <AiOutlineMail />
                                    toukir486@gmail.com
                                </div>
                                <div className='flex items-center gap-1'>
                                    <BiCreditCardFront />
                                    <p className='text-rose-500'>vendor</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <CiLocationOn />
                                    123 Elm Street, Springfield, IL
                                </div>
                            </div>
                            {/* <p className="text-gray-500 mt-2">moinul@islam.com | vendor | 123 Elm Street, Springfield, IL</p> */}
                            <p className=" text-[#808390] mt-3">
                                A tech enthusiast and avid online shopper. Moinul Islam is always on the lookout for innovative gadgets, stylish apparel, and practical home essentials. Passionate about quality, value, and customer satisfaction.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="mt-2 bg-white p-4 flex justify-between items-center border-b">
                    <h4 className='text-xl'>Customize Profile</h4>
                    <div className='text-sm flex gap-1'>
                        <button className='border px-4 py-1 rounded-full'>Personal Info</button>
                        <button className='border px-4 py-1 rounded-full'>Shop Info</button>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
                    <div className="border-b pb-4 mb-4 flex justify-between">
                        <div className='w-1/2'>
                            <h3 className="text-lg font-semibold">Profile Info</h3>
                            <p className="text-gray-500 mb-4">Change profile picture. It must be 1MB or less.</p>
                        </div>
                        <div className="flex flex-col w-1/2 space-y-4">
                            {/* Upload Area */}
                            <div>
                                <label className="block text-sm font-medium mb-2 ">Upload Profile</label>
                                <div className="border-dashed border  border-gray-300 rounded-lg p-4 text-center  relative cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={handleImageChange}
                                        className="absolute hidden inset-0 opacity-0 cursor-pointer"
                                    />

                                    <div className="flex gap-4 items-center h-full">
                                        <div className='bg-[#F6F7F8] p-4 rounded-full text-gray-400'>
                                            <FolderOpenDot size={22} />
                                        </div>
                                        <div className='text-start'>
                                            <p className='text-[#808390] font-medium'>Upload your files</p>
                                            <p className='text-[#BABFC4] text-sm'>Click to browse JPG or PNG formats.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Selected File Details */}
                            {selectedImage && (
                                <div className="flex items-center justify-between bg-gray-100 border rounded-lg px-4 py-2 w-1/3">
                                    <div>
                                        <p className="text-gray-700">{selectedImage.name.length > 15 ? `${selectedImage.name.slice(0, 15)}...` : selectedImage.name}</p>
                                        <p className="text-xs text-gray-500">{(selectedImage.size / 1024).toFixed(2)} MB</p>
                                    </div>
                                    <button onClick={handleRemoveImage}>
                                        <AiOutlineDelete className="w-5 h-5 text-gray-500 hover:text-red-500" />
                                    </button>
                                </div>
                            )}

                            {/* Name Input Field */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                                    placeholder="Moinul Islam"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-b flex justify-between pb-4 mb-4 space-y-4">
                        <div className='w-1/2'>
                            <h3 className="text-lg font-semibold">Contact Info</h3>
                            <p className="text-gray-500 mb-4">Change your email address and phone number.</p>
                        </div>
                        <div className=" gap-4 w-1/2">
                            <div>
                                <label className="block text-sm font-medium mb-2 ">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                                    placeholder="toukir@gmail.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 ">Address</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                                    placeholder="123 Elm Street, Springfield, IL"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">Others</h3>
                        <p className="text-gray-500 mb-4">Change your bio.</p>
                        <label className="block text-sm font-medium mb-2 ">Bio</label>
                        <textarea
                            className="w-full px-4 py-2 rounded-lg border border-gray-300"
                            placeholder="A tech enthusiast and avid online shopper..."
                        ></textarea>
                    </div>

                    <button className="mt-6 px-6 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
