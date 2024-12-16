/*
  Warnings:

  - Added the required column `brand` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `styleCode` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Department" AS ENUM ('Men', 'Wommen', 'kids');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "department" "Department" NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "styleCode" TEXT NOT NULL;
