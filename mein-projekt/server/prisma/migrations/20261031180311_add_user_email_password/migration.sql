/*
  Warnings:

  - You are about to drop the `benutzer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "benutzer";

-- CreateTable
CREATE TABLE "Benutzer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Benutzer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Benutzer_email_key" ON "Benutzer"("email");
