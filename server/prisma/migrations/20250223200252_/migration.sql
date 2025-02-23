/*
  Warnings:

  - You are about to drop the column `brand` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryCount` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `isFlashSale` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `styleCode` on the `products` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "brand",
DROP COLUMN "color",
DROP COLUMN "department",
DROP COLUMN "inventoryCount",
DROP COLUMN "isFlashSale",
DROP COLUMN "model",
DROP COLUMN "rating",
DROP COLUMN "styleCode",
ADD COLUMN     "quantity" INTEGER NOT NULL;
