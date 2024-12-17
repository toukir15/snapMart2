"use client"
import { CustomTable } from '@/src/components/shared/table/table';
import { productColumns } from '@/src/components/shared/table/table.const';
import { useGetVendorProducts } from '@/src/hooks/product.hook';
import React from 'react';

export default function page() {
  const { data: productsData, isLoading: isProductDataLoading } = useGetVendorProducts();

  const handleEdit = (id: string, record: any) => {
    console.log(`Edit product: ${id}`, record);
  };
  const handleDuplicate = (id: string, record: any) => {
    console.log(`Edit product: ${id}`, record);
  };

  const handleDelete = (id: string, record: any) => {
    console.log(`Delete product: ${id}`, record);
    // Show confirmation or perform delete action here
  };

  const actions = [
    {
      label: "Duplicate",
      onClick: handleDuplicate,
      className: "bg-indigo-500 hover:bg-green-600 transition duration-150 py-1 px-3 rounded text-white",
    },
    {
      label: "edit",
      onClick: handleDelete,
      className: "bg-green-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white",
    },
    {
      label: "Delete",
      onClick: handleDelete,
      className: "bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white",
    },
  ];

  return (
    <div className="xl:px-4 lg:px-32 mt-8 lg:mt-20">
      <CustomTable
        columns={productColumns}
        data={productsData?.data?.data || []}
        actions={actions}
        loading={isProductDataLoading}
      />
    </div>
  );
}
