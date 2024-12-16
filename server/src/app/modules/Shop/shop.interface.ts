export interface IShop {
  id: string;
  vendorId: string;
  name: string;
  logo?: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
