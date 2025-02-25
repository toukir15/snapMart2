"use client";
import {
  IProductProviderValues,
  ProductContext,
} from "@/src/context/product.provider";
import React, { useContext } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

export default function ProductPreviewImage({
  initialPreview,
}: {
  initialPreview: string;
}) {
  const { productStates } = useContext(
    ProductContext
  ) as IProductProviderValues;
  const { selectedProductPreview } = productStates;

  return (
    <div className="w-[630px] h-[460px] flex justify-center items-center overflow-hidden  bg-gray-100 rounded-xl px-4 shadow">
      <InnerImageZoom
        className="max-w-full max-h-full object-contain"
        src={selectedProductPreview ? selectedProductPreview : initialPreview}
        zoomSrc={
          selectedProductPreview ? selectedProductPreview : initialPreview
        }
      />
    </div>
  );
}
