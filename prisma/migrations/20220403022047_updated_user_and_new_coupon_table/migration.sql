/*
  Warnings:

  - You are about to drop the column `nickname` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "nickname";

-- CreateTable
CREATE TABLE "coupon" (
    "id" SERIAL NOT NULL,
    "coupon" VARCHAR(25) NOT NULL,
    "discount" INTEGER NOT NULL,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("id")
);
