/*
  Warnings:

  - The primary key for the `sells` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sells` table. All the data in the column will be lost.
  - The required column `auth_token` was added to the `sells` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "sell_products" DROP CONSTRAINT "sell_products_sell_id_fkey";

-- AlterTable
ALTER TABLE "sells" DROP CONSTRAINT "sells_pkey",
DROP COLUMN "id",
ADD COLUMN     "auth_token" TEXT NOT NULL,
ADD CONSTRAINT "sells_pkey" PRIMARY KEY ("auth_token");

-- AddForeignKey
ALTER TABLE "sell_products" ADD CONSTRAINT "sell_products_sell_id_fkey" FOREIGN KEY ("sell_id") REFERENCES "sells"("auth_token") ON DELETE RESTRICT ON UPDATE CASCADE;
