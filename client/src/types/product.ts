import { ICategory } from "./category";

export interface IProduct {
  id: string;
  shopId: string;
  name: string;
  price: number;
  isFlashSale: boolean;
  categoryId: string;
  description: string;
  rating: number;
  inventoryCount: number;
  discount: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  category: ICategory;
}
