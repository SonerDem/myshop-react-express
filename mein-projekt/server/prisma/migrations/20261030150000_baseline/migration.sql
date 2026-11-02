CREATE SCHEMA IF NOT EXISTS "public";

CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "size" TEXT[],
    "color" TEXT[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);