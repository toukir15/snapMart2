import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlinePreview } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { FaShop } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";

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
    label: "Users",
    key: "1",
    icon: <HiUsers size={18} />,
    link: "/dashboard/admin/users",
  },
  {
    label: "Shops",
    key: "2",
    icon: <FaShop size={20} />,
    link: "/dashboard/admin/shops",
  },
  {
    label: "Products",
    key: "3",
    icon: <AiFillProduct size={20} />,
    link: "/dashboard/admin/products",
  },
  {
    label: "Reviews",
    key: "4",
    icon: <MdOutlinePreview size={20} />,
    link: "/dashboard/admin/reviews",
  },
];