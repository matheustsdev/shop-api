/*
  Warnings:

  - You are about to drop the column `auth_token` on the `auth_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth_tokens" DROP COLUMN "auth_token";
