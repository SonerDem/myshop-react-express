-- CreateTable
CREATE TABLE "benutzer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,

    CONSTRAINT "benutzer_pkey" PRIMARY KEY ("id")
);
