import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlinePreview } from "react-icons/md";
import { FaChartPie } from "react-icons/fa6";
import { IoCreateOutline } from "react-icons/io5";
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
    key: "1",
    icon: <FaChartPie size={18} />,
    link: "/dashboard/admin",
  },
  {
    label: "Brand",
    key: "2",
    icon: <TbBrandBebo size={20} />,
    children: [
      {
        label: "Create Brand",
        key: "2-1",
        icon: <IoCreateOutline size={20} />,
        link: "/dashboard/admin/brand/create-brand",
      },
      {
        label: "All Brands",
        key: "2-2",
        icon: <TbBrandBinance size={20} />,
        link: "/dashboard/admin/brand",
      },
    ],
  },
  {
    label: "Category",
    key: "3",
    icon: <TbBrandBebo size={20} />,
    children: [
      {
        label: "Create Category",
        key: "3-1",
        icon: <IoCreateOutline size={20} />,
        link: "/dashboard/admin/category/create-category",
      },
      {
        label: "All Categories",
        key: "3-2",
        icon: <TbBrandBinance size={20} />,
        link: "/dashboard/admin/category",
      },
    ],
  },
  {
    label: "Coupon",
    key: "4",
    icon: <MdOutlineDiscount size={20} />,
    children: [
      {
        label: "Create Coupon",
        key: "4-1",
        icon: <IoCreateOutline size={20} />,
        link: "/dashboard/admin/coupon/create-coupon",
      },
      {
        label: "All Coupons",
        key: "4-2",
        icon: <CiDiscount1 size={20} />,
        link: "/dashboard/admin/coupon",
      },
    ],
  },
  {
    label: "Users",
    key: "5",
    icon: <LuUsers size={20} />,
    children: [
      {
        label: "Admins",
        key: "5-1",
        icon: <TiUser size={20} />,
        link: "/dashboard/admin/user/admins",
      },
      {
        label: "Vendors",
        key: "5-2",
        icon: <TiUser size={20} />,
        link: "/dashboard/admin/user/vendors",
      },
      {
        label: "Customers",
        key: "5-3",
        icon: <TiUser size={20} />,
        link: "/dashboard/admin/user/customers",
      },
    ],
  },
  {
    label: "Shops",
    key: "6",
    icon: <AiOutlineShop size={20} />,
    link: "/dashboard/admin/shops",
  },
  {
    label: "Products",
    key: "7",
    icon: <AiOutlineProduct size={20} />,
    link: "/dashboard/admin/products",
  },
  {
    label: "Reviews",
    key: "8",
    icon: <MdOutlinePreview size={20} />,
    link: "/dashboard/admin/reviews",
  },
  {
    label: "Transactions",
    key: "9",
    icon: <LuBadgeDollarSign size={20} />,
    link: "/dashboard/admin/transactions",
  },
];


