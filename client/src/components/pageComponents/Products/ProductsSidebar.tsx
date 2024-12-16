"use client";
import { useContext } from "react";
import {
  IProductProviderValues,
  ProductContext,
} from "@/src/context/product.provider";
import { Button } from "@nextui-org/button";
import { FilterGroup } from "./FilterGroup";
import { PriceFilter } from "./PriceFilter";
export const ProductSidebar = ({
  categories,
  brands,
}: {
  categories: string[];
  brands: string[];
}) => {
  const { productStates } = useContext(
    ProductContext
  ) as IProductProviderValues;

  const {
    brand,
    category,
    searchTerm,
    minPrice,
    maxPrice,
    setBrand,
    setCategory,
    setSearchTerm,
    setMinPrice,
    setMaxPrice,
  } = productStates;

  const handleClearFilter = () => {
    setBrand("");
    setCategory("");
    setSearchTerm("");
    setMinPrice(0);
    setMaxPrice(0);
  };

  const checkUseFilter =
    !!brand || !!category || !!searchTerm || !!minPrice || !!maxPrice;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        {checkUseFilter && (
          <Button onClick={handleClearFilter} color="danger" variant="solid">
            Clear
          </Button>
        )}
      </div>
      <FilterGroup
        selectedOption={category}
        setSelectedOption={setCategory}
        title="Category"
        options={categories}
        type="search"
      />
      <FilterGroup
        selectedOption={brand}
        setSelectedOption={setBrand}
        title="Brand"
        options={brands}
        type="search"
      />
      <PriceFilter />
    </div>
  );
};
