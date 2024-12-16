"use client";
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";


// Define the shape of the context values
export interface IProductProviderValues {
  productStates: {
    selectedProductPreview: string;
    setSelectedProductPreview: Dispatch<SetStateAction<string>>;
    brand: string;
    setBrand: Dispatch<SetStateAction<string>>;
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    minPrice: number;
    setMinPrice: Dispatch<SetStateAction<number>>;
    maxPrice: number;
    setMaxPrice: Dispatch<SetStateAction<number>>;
    productPage: number;
    setProductPage: Dispatch<SetStateAction<number>>;
    cartQuantity: number;
    setCartQuantity: Dispatch<SetStateAction<number>>;
  };
}

// Create the context
export const ProductContext = createContext<IProductProviderValues | undefined>(
  undefined
);

// Define the provider component
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProductPreview, setSelectedProductPreview] =
    useState<string>("");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [productPage, setProductPage] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(0);


  return (
    <ProductContext.Provider
      value={{
        productStates: {
          selectedProductPreview,
          setSelectedProductPreview,
          brand,
          setBrand,
          category,
          setCategory,
          searchTerm,
          setSearchTerm,
          minPrice,
          setMinPrice,
          maxPrice,
          setMaxPrice,
          productPage,
          setProductPage,
          cartQuantity,
          setCartQuantity
        },
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
