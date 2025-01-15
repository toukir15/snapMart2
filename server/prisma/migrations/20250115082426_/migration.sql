/*
  Warnings:

  - You are about to drop the column `code` on the `cupons` table. All the data in the column will be lost.
  - You are about to drop the column `discountPercentage` on the `cupons` table. All the data in the column will be lost.
  - You are about to drop the column `validFrom` on the `cupons` table. All the data in the column will be lost.
  - You are about to drop the column `validUntil` on the `cupons` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `cupons` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `cupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `couponCode` to the `cupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountValue` to the `cupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `cupons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cupons" DROP CONSTRAINT "cupons_vendorId_fkey";

-- DropIndex
DROP INDEX "cupons_vendorId_key";

-- AlterTable
ALTER TABLE "cupons" DROP COLUMN "code",
DROP COLUMN "discountPercentage",
DROP COLUMN "validFrom",
DROP COLUMN "validUntil",
DROP COLUMN "vendorId",
ADD COLUMN     "adminId" TEXT NOT NULL,
ADD COLUMN     "couponCode" TEXT NOT NULL,
ADD COLUMN     "discountValue" INTEGER NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "cupons" ADD CONSTRAINT "cupons_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
