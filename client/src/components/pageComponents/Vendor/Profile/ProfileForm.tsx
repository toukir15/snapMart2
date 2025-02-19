import { FolderOpenDot, Save } from 'lucide-react'
import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';

export default function ProfileForm() {
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
        <form className=" bg-white rounded-2xl shadow-md">
            <div className="border-b px-6 py-10 flex justify-between">
                <div className='w-1/2'>
                    <h3 className="text-lg font-medium  text-[#0D0E43]">Profile Info</h3>
                    <p className="text-gray-500 mb-4 text-[16px]">Change profile picture. It must be 1MB or less.</p>
                </div>
                <div className="flex flex-col w-1/2 space-y-4">
                    {/* Upload Area */}
                    <div>
                        <label className="block text-sm font-medium mb-2 ">Upload Profile</label>
                        <div className="border-dashed border  border-gray-300 rounded p-4 text-center  relative cursor-pointer">
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleImageChange}
                                className="absolute  inset-0 opacity-0 cursor-pointer"
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
                        <div className="flex items-center justify-between bg-gray-100 border rounded-lg px-4 py-2 ">
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
                            className="w-full px-4 py-3 rounded outline-none text-sm border border-gray-200"
                            placeholder="Vendor name"
                        />
                    </div>
                </div>
            </div>

            <div className="border-b flex justify-between px-6 py-10 ">
                <div className='w-1/2'>
                    <h3 className="text-lg font-semibold">Contact Info</h3>
                    <p className="text-gray-500 mb-4 text-[16px]">Change your email address and phone number.</p>
                </div>
                <div className=" gap-4 w-1/2 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 ">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded outline-none  border text-sm border-gray-200"
                            placeholder="example@gmail.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 ">Address</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded outline-none  border text-sm border-gray-200"
                            placeholder="123 Elm Street, Springfield, IL"
                        />
                    </div>
                </div>
            </div>

            <div className='flex justify-between border-b px-6 py-10'>
                <div className='w-1/2'>
                    <h3 className="text-lg font-semibold">Others</h3>
                    <p className="text-gray-500 mb-4 text-[16px]">Change your bio.</p>
                </div>
                <div className='w-1/2'>
                    <label className="block text-sm font-medium mb-2 ">Bio</label>
                    <textarea
                        rows={5}
                        className="w-full px-4 py-3 text-sm rounded border border-gray-200 outline-none"
                        placeholder="A tech enthusiast and avid online shopper..."
                    ></textarea>
                </div>
            </div>
            <div className='flex justify-end px-8'>
                <button className=" px-6 py-2 my-4 flex gap-1 text-sm font-medium items-center rounded bg-pink-500 text-white hover:bg-pink-600">
                    <Save size={18} />
                    <span> Save</span>
                </button>
            </div>
        </form>
    )
}
