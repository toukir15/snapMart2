"use client";
import React, { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import {
  IProductProviderValues,
  ProductContext,
} from "@/src/context/product.provider";

export default function ProductPreviewImageSlider({
  images,
}: {
  images: string[];
}) {
  const { productStates } = useContext(
    ProductContext
  ) as IProductProviderValues;
  const { setSelectedProductPreview, selectedProductPreview } = productStates;

  // Set the initial preview image using useEffect
  useEffect(() => {
    if (!selectedProductPreview && images.length > 0) {
      setSelectedProductPreview(images[0]); // Set the first image as the default preview
    }
  }, [selectedProductPreview, images, setSelectedProductPreview]);

  return (
    <div className="mt-2">
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => setSelectedProductPreview(image)}
              className={`cursor-pointer border ${selectedProductPreview == image
                ? "border-orange-500"
                : "border-gray-500"
                }`}
            >
              <div className="w-full h-[70px] relative">
                <Image
                  src={image}
                  alt={`Product preview ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
