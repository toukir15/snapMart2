// Define form data interface
export interface ProductFormData {
    name: string;
    department: string;
    category: string;
    price: number;
    brand: string;
    rating: number;
    model: string;
    styleCode: string;
    color: string;
    inventoryCount: number;
    discount: number;
    flashSale: boolean;
    description: string;
}

export type Department = { key: string; label: string };
export type Category = { key: string; label: string };