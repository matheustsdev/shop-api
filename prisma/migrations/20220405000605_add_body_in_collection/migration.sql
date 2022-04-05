/*
  Warnings:

  - Added the required column `body` to the `collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "collection" ADD COLUMN     "body" TEXT NOT NULL;
