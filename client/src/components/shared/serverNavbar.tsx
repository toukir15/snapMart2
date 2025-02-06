"use client";
import React, { useContext, useState } from "react";
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import NextLink from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { SearchIcon, Logo } from "@/src/components/icons";
import {
    IProductProviderValues,
    ProductContext,
} from "../../context/product.provider";
import profileImg from "../../../public/profile.jpeg";
import { useGetCartCount } from "../../hooks/cartItem.hook";
import Image from "next/image";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

const ServerNavbar = () => {
    const [cartCount, setCartCount] = useState(5);
    const { productStates } = useContext(
        ProductContext
    ) as IProductProviderValues;
    const { setSearchTerm, searchTerm } = productStates;

    const handleSearchKeyPress = (e: any) => {
        if (e.key === "Enter") {
            setSearchTerm(e.target.value);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm("");
    };

    const handleSearchOnChange = (e: any) => {
        if (e.target.value === "") {
            setSearchTerm("");
        }
    };

    const searchInput = (
        <Input
            onKeyDown={handleSearchKeyPress}
            defaultValue={searchTerm}
            onClear={handleClearSearch}
            onChange={handleSearchOnChange}
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm w-80",
            }}
            placeholder="Search..."
            startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
        />
    );

    return (
        <div className="w-full">
            <NextUINavbar
                className="bg-[#F85606] py-4"
                maxWidth="xl"
                position="static"
            >
                <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                    <NavbarBrand as="li" className="gap-3 max-w-fit">
                        <NextLink
                            className="flex justify-start items-center gap-1"
                            href="/"
                        >
                            <Logo color="white" />
                            <p className="font-bold text-xl text-white text-inherit">
                                SnapMart
                            </p>
                        </NextLink>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent
                    className="hidden sm:flex basis-1/5 sm:basis-full"
                    justify="end"
                >
                    <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
                    <NavbarItem className="hidden lg:flex relative">
                        <Link href={"/cart/dsf"}>
                            <LuShoppingCart className="text-[24px] text-white cursor-pointer" />
                            <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="hidden lg:flex relative">
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <div className="border-2 rounded-full p-[2px] cursor-pointer">
                                    <Image
                                        className="rounded-full"
                                        src={profileImg}
                                        height={32}
                                        width={32}
                                        alt="profile"
                                    />
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="User Actions"
                                variant="light"
                                className="w-48"
                            >
                                <DropdownItem key="dashboard">
                                    <NextLink href="/dashboard/vendor">Vendor</NextLink>
                                </DropdownItem>
                                <DropdownItem key="dashboard">
                                    <NextLink href="/dashboard/admin">Admin</NextLink>
                                </DropdownItem>
                                <DropdownItem key="logout">
                                    <button onClick={() => console.log("Logout clicked")}>
                                        Logout
                                    </button>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                    <NavbarMenuToggle />
                </NavbarContent>

                <NavbarMenu>
                    {searchInput}
                    <button onClick={handleSearchKeyPress} className="mt-4">
                        Search
                    </button>
                </NavbarMenu>
            </NextUINavbar>
        </div>
    );
};

export default ServerNavbar;
