"use client"
import React, { useState } from 'react';
import profile1 from "../../../../../../../../public/profile1.png"
import Image from 'next/image';
import { AiOutlineMail } from "react-icons/ai";
import { BiCreditCardFront } from 'react-icons/bi';
import { CiLocationOn } from "react-icons/ci";
import ProfileForm from '@/src/components/pageComponents/Vendor/Profile/ProfileForm';
import ShopForm from '@/src/components/pageComponents/Vendor/Profile/ShopForm';

const UserProfile = () => {
    const [toggleProfileInfo, setToggleProfileInfo] = useState("profile")
    return (
        <div className="min-h-screen">
            <div className='bg-white rounded-lg'>
                {/* Header */}
                <div className="bg-white  rounded-2xl">
                    <h1 className="text-2xl font-medium mb-4 border-b py-4 px-6">My Profile</h1>
                    <div className="flex gap-3 items-center px-6">
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
                            <p className=" text-[#808390] mt-3">
                                A tech enthusiast and avid online shopper. Moinul Islam is always on the lookout for innovative gadgets, stylish apparel, and practical home essentials. Passionate about quality, value, and customer satisfaction.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="mt-2 bg-white p-4 flex justify-between items-center border-b">
                    <h4 className='text-xl font-medium'>Customize Profile</h4>
                    <div className='text-sm flex gap-1'>
                        <button onClick={() => setToggleProfileInfo("profile")} className={`border px-4 py-1 ${toggleProfileInfo == "profile" && "bg-[#F6F7F8]"} hover:bg-[#F6F7F8] transition-200  rounded-full`}>Personal Info</button>
                        <button onClick={() => setToggleProfileInfo("shop")} className={`border px-4 py-1 ${toggleProfileInfo == "shop" && "bg-[#F6F7F8]"} hover:bg-[#F6F7F8] transition-200 rounded-full`}>Shop Info</button>
                    </div>
                </div>

                {/* Profile Form */}
                {toggleProfileInfo == "profile" && <ProfileForm />}

                {/* Profile Form */}
                {toggleProfileInfo == "shop" && <ShopForm />}
            </div>
        </div>
    );
};

export default UserProfile;
