import React from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

import { Rating } from "@smastrom/react-rating";
import { getProduct, getSuggestedProduct } from "@/src/services/product/query";
import ProductPreviewImage from "@/src/components/pageComponents/ProductDetails/ProductPreviewImage";
import ProductPreviewImageSlider from "@/src/components/pageComponents/ProductDetails/ProductPreviewImageSlider";
import ProductDetails from "@/src/components/pageComponents/ProductDetails/ProductDetails";
import AdditionalInformation from "@/src/components/pageComponents/ProductDetails/AdditionalInformation";
import ProductCounter from "@/src/components/pageComponents/ProductDetails/ProductCounter";
import ProductSuggestion from "@/src/components/pageComponents/ProductDetails/ProductSuggestion";
import ProductSize from "@/src/components/pageComponents/ProductDetails/ProductSize";


type ProductDetailsPageProps = {
  params: { productId: string };
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  try {
    // Fetch the product data
    const { data: productData } = await getProduct(params?.productId);
    const { data: productSuggestedData } = await getSuggestedProduct(productData?.id);

    return (
      <div className="mt-[200px] min-h-screen">
        <div className="flex gap-12">
          {/* Product view images */}
          <div>
            <div className="h-[530px] w-[530px]">
              <ProductPreviewImage initialPreview={productData.images[0]} />
              <ProductPreviewImageSlider images={productData.images} />
            </div>
          </div>
          <div className="p-6">
            {/* Product Name */}
            <h3 className="text-3xl font-semibold text-gray-800 mb-2">
              {productData.name}
            </h3>
            <p className="text-sm text-gray-700">{productData.category?.name}</p>
            {/* Rating */}
            <Rating
              className="mt-2"
              style={{ maxWidth: 100 }}
              value={productData.rating}
              readOnly
            />
            {/* Section Title */}
            <h3 className="text-2xl font-medium text-gray-700 mt-6">Details</h3>
            {/* Product Details */}
            <ProductDetails data={productData} />

            {/* Additional Information */}
            <AdditionalInformation data={productData} />

            {/* Shoe Size Selection */}
            <ProductSize />

            {/* Add to cart counter */}
            <ProductCounter data={productData} />
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="mt-20 text-2xl font-medium">Description</h3>
          <p className="mt-4">{productData.description}</p>
        </div>

        {/* Product Suggestions */}
        <ProductSuggestion productSuggestedData={productSuggestedData} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product details:", error);
    return <div>Error loading product details.</div>;
  }
}
