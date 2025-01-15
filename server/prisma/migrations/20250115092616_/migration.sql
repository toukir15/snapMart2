/*
  Warnings:

  - You are about to drop the column `adminId` on the `cupons` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cupons" DROP CONSTRAINT "cupons_adminId_fkey";

-- AlterTable
ALTER TABLE "cupons" DROP COLUMN "adminId",
ALTER COLUMN "startDate" DROP DEFAULT;
