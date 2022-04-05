/*
  Warnings:

  - You are about to drop the `coupon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "coupon";

-- CreateTable
CREATE TABLE "collection" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection_products" (
    "id" SERIAL NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "collection_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "collection_products" ADD CONSTRAINT "collection_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_products" ADD CONSTRAINT "collection_products_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
