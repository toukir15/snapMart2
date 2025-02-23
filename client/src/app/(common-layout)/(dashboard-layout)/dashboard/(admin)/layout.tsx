"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChartPie } from "react-icons/fa";
import { MdManageHistory } from "react-icons/md";
import { ReactNode } from "react";
import { RiUserSettingsLine, RiCouponLine } from "react-icons/ri";
import { BiLayer } from "react-icons/bi";
import { AiOutlineOrderedList, AiOutlineStar } from "react-icons/ai";

interface DashboardLayoutProps {
  children: ReactNode;
}

const VendorSidebarRoutes = [
  { label: "Dashboard", icon: <FaChartPie size={18} />, link: "/dashboard/admin" },
  { label: "Profile", icon: <RiUserSettingsLine size={20} />, link: "/dashboard/vendor/profile" },
  { label: "Categories", icon: <BiLayer size={20} />, link: "/dashboard/admin/category" },
  { label: "Products", icon: <BiLayer size={20} />, link: "/dashboard/admin/products" },
  { label: "Coupons", icon: <AiOutlineStar size={20} />, link: "/dashboard/admin/coupon" },
  { label: "Reviews", icon: <AiOutlineOrderedList size={20} />, link: "/dashboard/admin/reviews" },
  // { label: "Orders", icon: <AiOutlineOrderedList size={20} />, link: "/dashboard/admin/order-history" },
  { label: "Users", icon: <AiOutlineOrderedList size={20} />, link: "/dashboard/admin/order-history" },
  { label: "Stores", icon: <AiOutlineOrderedList size={20} />, link: "/dashboard/admin/stores" },
  { label: "Logout", icon: <MdManageHistory size={20} />, link: "/dashboard/vendor/order-history" },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname(); // Use usePathname instead of useRouter

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="py-4 border-b fixed top-0 left-0 w-full z-50 bg-white">
        <h1 className="text-xl font-bold px-8">SnapMart</h1>
      </nav>

      <div className="flex min-h-screen bg-gray-50 max-w-[1500px] mx-auto pt-15">
        {/* Sidebar (Fixed) */}
        <aside className="w-64 bg-white h-screen fixed top-16">
          <nav className="flex flex-col gap-1">
            {VendorSidebarRoutes.map((route) => {
              const isActive = pathname === route.link;
              return (
                <Link href={route.link} key={route.label}>
                  <div
                    className={`flex items-center gap-2 py-[13px] px-5 text-sm cursor-pointer transition duration-200
                      ${isActive
                        ? "bg-[#F6F7F8] text-[#333438] font-medium"
                        : "text-[#808390] hover:text-[#333438] hover:bg-[#F6F7F8]"
                      }
                    `}
                  >
                    {route.icon}
                    <span>{route.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content Area (Scrollable) */}
        <main className="flex-1 p-10 pt-24 bg-[#F6F7F8] ml-64">{children}</main>
      </div>
    </div>
  );
}
