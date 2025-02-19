"use client"
import React from "react";
import {
  Trash2,
  Copy,
  Edit,
} from "lucide-react";
import ReusableTable from "@/src/components/shared/table/CustomTable";

const ProductManagement = () => {
  const products = [
    { id: 1, name: 'Wireless Bluetooth', category: 'Table', price: 122, shop: 'Moinul\'s Tech', discount: 10, image: 'https://th.bing.com/th/id/OIP.EA3HcfZCBdicCPUBOCq_NQHaJ3?rs=1&pid=ImgDetMain' },
    { id: 2, name: 'Gaming Laptop', category: 'Cabinet', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: 'https://th.bing.com/th/id/OIP.EA3HcfZCBdicCPUBOCq_NQHaJ3?rs=1&pid=ImgDetMain' },
    { id: 3, name: 'Wireless Bluetooth', category: 'Table', price: 122, shop: 'Moinul\'s Tech', discount: 10, image: 'https://th.bing.com/th/id/OIP.EA3HcfZCBdicCPUBOCq_NQHaJ3?rs=1&pid=ImgDetMain' },
    { id: 4, name: 'Gaming Laptop', category: 'Cabinet', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: 'https://th.bing.com/th/id/OIP.EA3HcfZCBdicCPUBOCq_NQHaJ3?rs=1&pid=ImgDetMain' },
    { id: 5, name: 'Wireless Bluetooth', category: 'Table', price: 122, shop: 'Moinul\'s Tech', discount: 10, image: 'https://th.bing.com/th/id/OIP.EA3HcfZCBdicCPUBOCq_NQHaJ3?rs=1&pid=ImgDetMain' },
    { id: 6, name: 'Gaming Laptop', category: 'Cabinet', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: 'https://th.bing.com/th/id/OIP.EA3HcfZCBdicCPUBOCq_NQHaJ3?rs=1&pid=ImgDetMain' },
    { id: 7, name: 'Wireless Bluetooth', category: 'Table', price: 122, shop: 'Moinul\'s Tech', discount: 10, image: 'https://th.bing.com/th/id/OIP.EA3HcfZCBdicCPUBOCq_NQHaJ3?rs=1&pid=ImgDetMain' },
    { id: 8, name: 'Gaming Laptop', category: 'Cabinet', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: 'https://th.bing.com/th/id/OIP.EA3HcfZCBdicCPUBOCq_NQHaJ3?rs=1&pid=ImgDetMain' },
  ];

  const columns = [
    { header: "Image", key: "image" as const },
    { header: "Product", key: "name" as const },
    { header: "Price", key: "price" as const },
    { header: "Shop Name", key: "shop" as const },
    { header: "Discount", key: "discount" as const },
  ];

  const actions = [
    {
      label: "Delete",
      icon: <Trash2 size={16} className="mr-2" />,
      onClick: (item) => console.log("Delete", item.id),
    },
    {
      label: "Duplicate",
      icon: <Copy size={16} className="mr-2" />,
      onClick: (item) => console.log("Duplicate", item.id),
    },
    {
      label: "Edit",
      icon: <Edit size={16} className="mr-2" />,
      onClick: (item) => console.log("Edit", item.id),
    },
  ];

  return <ReusableTable title="Products" data={products} columns={columns} actions={actions} />;
};

export default ProductManagement;
