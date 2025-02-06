/*
  Warnings:

  - A unique constraint covering the columns `[couponCode]` on the table `cupons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cupons_couponCode_key" ON "cupons"("couponCode");
