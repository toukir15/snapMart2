import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlinePreview } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { FaShop } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { FaChartPie } from "react-icons/fa6";
import { IoCreateOutline } from "react-icons/io5";
import { TbShoe } from "react-icons/tb";
import { TbBrandBebo } from "react-icons/tb";
import { TbBrandBinance } from "react-icons/tb";
import { FaCuttlefish } from "react-icons/fa";
import { FaFireFlameCurved } from "react-icons/fa6";
import { MdDiscount } from "react-icons/md";
import { MdOutlineDiscount } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";

export const DEPARTMENTS = [
  { key: "Men", label: "Men" },
  { key: "Women", label: "Women" },
  { key: "Kids", label: "Kids" },
];

export const VendorSidebarRoutes = [
  {
    label: "Products",
    key: "1",
    icon: <AiOutlineProduct size={20} />,
    link: "/dashboard/vendor/products",
  },
  {
    label: "Reviews",
    key: "2",
    icon: <MdOutlinePreview size={20} />,
    link: "/dashboard/vendor/reviews",
  },
];


export const AdminSidebarRoutes = [
  {
    label: "Dashboard",
    key: "1", // Changed to start with 1
    icon: <FaChartPie size={18} />,
    link: "/dashboard/admin",
  },
  {
    label: "Brand",
    key: "2", // Sequential ordering
    icon: <TbBrandBebo size={20} />,
    children: [
      {
        label: "Create Brand",
        key: "2-1", // Nested under "Brand"
        icon: <IoCreateOutline size={20} />,
        link: "/dashboard/admin/products",
      },
      {
        label: "All Brands",
        key: "2-2",
        icon: <TbBrandBinance size={20} />,
        link: "/dashboard/admin/products",
      },
    ],
  },
  {
    label: "Coupon",
    key: "3", // Sequential ordering
    icon: <MdOutlineDiscount size={20} />,
    children: [
      {
        label: "Create Coupon",
        key: "3-1", // Nested under "Coupon"
        icon: <IoCreateOutline size={20} />,
        link: "/dashboard/admin/products",
      },
      {
        label: "All Coupons",
        key: "3-2",
        icon: <CiDiscount1 size={20} />,
        link: "/dashboard/admin/products",
      },
    ],
  },
  {
    label: "Users",
    key: "4", // Sequential ordering
    icon: <HiUsers size={18} />,
    link: "/dashboard/admin/users",
  },
  {
    label: "Shops",
    key: "5", // Sequential ordering
    icon: <FaShop size={20} />,
    link: "/dashboard/admin/shops",
  },
  {
    label: "Products",
    key: "6", // Sequential ordering
    icon: <AiFillProduct size={20} />,
    children: [
      {
        label: "Create Product",
        key: "6-1", // Nested under "Products"
        icon: <IoCreateOutline size={20} />,
        link: "/dashboard/admin/products",
      },
      {
        label: "All Products",
        key: "6-2",
        icon: <TbShoe size={20} />,
        link: "/dashboard/admin/products",
      },
    ],
  },
  {
    label: "Reviews",
    key: "7", // Sequential ordering
    icon: <MdOutlinePreview size={20} />,
    link: "/dashboard/admin/reviews",
  },
];
