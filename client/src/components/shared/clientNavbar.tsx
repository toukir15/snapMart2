
import React from "react";
import { Link } from "@nextui-org/link";
import { getCurrentUser } from "@/src/services/auth";

const ClientNavbar = async () => {
    const user = await getCurrentUser()
    return (
        <div className="w-[1280px]  mx-auto px-8 flex justify-end">
            <div className="flex gap-8 text-white">
                <Link href={`/`} className="text-white">Home</Link>
                <Link href={`/products`} className="text-white">Products</Link>
                <Link href={`/products`} className="text-white">Flash Sale</Link>

                <Link href={user?.shopId ? `/vendor/shop/${user?.shopId}` : `/vendor/create-shop`} className="text-white">Shop</Link>
                {/* <Link href="/vendor/create-product" className="text-white">Create Product</Link> */}
                <button>Categories</button>
                <Link href={`/products`} className="text-white">Contact Us</Link>
                {/* {!user?.id && <button>Login</button>}
                {!user?.id && <button>Sign up</button>}
                {user?.id && <button>Logout</button>} */}
            </div>
        </div>
    );
};

export default ClientNavbar;
