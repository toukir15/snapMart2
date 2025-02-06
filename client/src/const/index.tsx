import { AiFillProduct, AiOutlineProduct } from "react-icons/ai";
import { MdManageHistory } from "react-icons/md";
import { FaChartPie } from "react-icons/fa6";
import { IoCreateOutline } from "react-icons/io5";
import { TbBrandBinance } from "react-icons/tb";
import { MdOutlineDiscount } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { TiUser } from "react-icons/ti";
import { LuUsers } from "react-icons/lu";
import { AiOutlineShop } from "react-icons/ai";
import { LuBadgeDollarSign } from "react-icons/lu";
import { MdCategory } from "react-icons/md";
import { FaComments, FaCrown } from "react-icons/fa";
import { BiBorderNone } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";

export const DEPARTMENTS = [
  { key: "Men", label: "Men" },
  { key: "Women", label: "Women" },
  { key: "Kids", label: "Kids" },
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
    icon: <FaCrown size={20} />,
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
    icon: <MdCategory size={20} />,
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
        link: "/dashboard/admin/user/admin",
      },
      {
        label: "Vendors",
        key: "5-2",
        icon: <TiUser size={20} />,
        link: "/dashboard/admin/user/vendor",
      },
      {
        label: "Customers",
        key: "5-3",
        icon: <TiUser size={20} />,
        link: "/dashboard/admin/user/customer",
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
    icon: <FaComments size={20} />,
    link: "/dashboard/admin/reviews",
  },
  {
    label: "Transactions",
    key: "9",
    icon: <LuBadgeDollarSign size={20} />,
    link: "/dashboard/admin/transactions",
  },
];

export const VendorSidebarRoutes = [
  {
    label: "Dashboard",
    key: "1",
    icon: <FaChartPie size={18} />,
    link: "/dashboard/vendor",
  },
  {
    label: "Create Shop",
    key: "5",
    icon: <IoCreateOutline size={20} />,
    link: "/dashboard/vendor/create-shop",
  },
  {
    label: "Product",
    key: "2",
    icon: <AiFillProduct size={22} />,
    children: [
      {
        label: "Create Product",
        key: "2-1",
        icon: <IoCreateOutline size={20} />,
        link: "/dashboard/vendor/product/create-product",
      },
      {
        label: "All Products",
        key: "2-2",
        icon: <BiBorderNone size={20} />,
        link: "/dashboard/vendor/product/all-products",
      },
    ],
  },
  {
    label: "Review",
    key: "3",
    icon: <IoMdEye size={20} />,
    link: "/dashboard/vendor/review",
  },
  {
    label: "Order History",
    key: "4",
    icon: <MdManageHistory size={20} />,
    link: "/dashboard/vendor/order-history",
  },
];



