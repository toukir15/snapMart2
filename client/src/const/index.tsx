import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlinePreview } from "react-icons/md";
import { FaChartPie } from "react-icons/fa6";
import { IoCreateOutline } from "react-icons/io5";
import { TbShoe } from "react-icons/tb";
import { TbBrandBebo } from "react-icons/tb";
import { TbBrandBinance } from "react-icons/tb";
import { MdOutlineDiscount } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { TiUser } from "react-icons/ti";
import { LuUsers } from "react-icons/lu";
import { AiOutlineShop } from "react-icons/ai";
import { LuBadgeDollarSign } from "react-icons/lu";

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
    key: "1", // Start with 1
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
        link: "/dashboard/admin/create-brand",
      },
      {
        label: "All Brands",
        key: "2-2", // Nested under "Brand"
        icon: <TbBrandBinance size={20} />,
        link: "/dashboard/admin/brands",
      },
    ],
  },
  {
    label: "Category",
    key: "3", // Sequential ordering
    icon: <TbBrandBebo size={20} />,
    children: [
      {
        label: "Create Category",
        key: "3-1", // Nested under "Category"
        icon: <IoCreateOutline size={20} />,
        link: "/dashboard/admin/create-category",
      },
      {
        label: "All Categories",
        key: "3-2", // Nested under "Category"
        icon: <TbBrandBinance size={20} />,
        link: "/dashboard/admin/categories",
      },
    ],
  },
  {
    label: "Coupon",
    key: "4", // Sequential ordering
    icon: <MdOutlineDiscount size={20} />,
    children: [
      {
        label: "Create Coupon",
        key: "4-1", // Nested under "Coupon"
        icon: <IoCreateOutline size={20} />,
        link: "/dashboard/admin/create-coupon",
      },
      {
        label: "All Coupons",
        key: "4-2", // Nested under "Coupon"
        icon: <CiDiscount1 size={20} />,
        link: "/dashboard/admin/products",
      },
    ],
  },
  {
    label: "Users",
    key: "5", // Sequential ordering
    icon: <LuUsers size={20} />,
    children: [
      {
        label: "Admins",
        key: "5-1", // Nested under "Users"
        icon: <TiUser size={20} />,
        link: "/dashboard/admin/products",
      },
      {
        label: "Vendors",
        key: "5-2", // Nested under "Users"
        icon: <TiUser size={20} />,
        link: "/dashboard/admin/products",
      },
      {
        label: "Customers",
        key: "5-3", // Nested under "Users"
        icon: <TiUser size={20} />,
        link: "/dashboard/admin/products",
      },
    ],
  },
  {
    label: "Shops",
    key: "6", // Sequential ordering
    icon: <AiOutlineShop size={20} />,
    link: "/dashboard/admin/shops",
  },
  {
    label: "Products",
    key: "7", // Sequential ordering
    icon: <AiOutlineProduct size={20} />,
    children: [
      {
        label: "Create Product",
        key: "7-1", // Nested under "Products"
        icon: <IoCreateOutline size={20} />,
        link: "/dashboard/admin/products",
      },
      {
        label: "All Products",
        key: "7-2", // Nested under "Products"
        icon: <TbShoe size={20} />,
        link: "/dashboard/admin/products",
      },
    ],
  },
  {
    label: "Reviews",
    key: "8", // Sequential ordering
    icon: <MdOutlinePreview size={20} />,
    link: "/dashboard/admin/reviews",
  },
  {
    label: "Transactions",
    key: "9", // Sequential ordering
    icon: <LuBadgeDollarSign size={20} />,
    link: "/dashboard/admin/reviews",
  },
];


