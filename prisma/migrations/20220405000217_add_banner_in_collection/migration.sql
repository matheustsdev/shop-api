/*
  Warnings:

  - Added the required column `banner_img` to the `collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "collection" ADD COLUMN     "banner_img" VARCHAR(255) NOT NULL;
