import { AiOutlineProduct } from "react-icons/ai";
import { BsShop } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlinePreview } from "react-icons/md";

export const DEPARTMENTS = [
  { key: "Men", label: "Men" },
  { key: "Women", label: "Women" },
  { key: "Kids", label: "Kids" },
];

export const VendorSidebarRoutes = [
  // {
  //   label: "Shop",
  //   key: "1",
  //   icon: <BsShop size={18} />,
  //   link: "/vendor/shop",
  // },
  // {
  //   label: "Create Product",
  //   key: "3",
  //   icon: <IoCreateOutline size={20} />,
  //   link: "/dashboard/vendor/create-product",
  // },
  {
    label: "Products",
    key: "4",
    icon: <AiOutlineProduct size={20} />,
    link: "/dashboard/vendor/products",
  },
  {
    label: "Reviews",
    key: "7",
    icon: <MdOutlinePreview size={20} />,
    link: "/vendor/reviews",
  },
];