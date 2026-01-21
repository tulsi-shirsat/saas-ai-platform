/*
  Warnings:

  - You are about to drop the `userapilimit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "userapilimit";

-- CreateTable
CREATE TABLE "UserApiLimit" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserApiLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserApiLimit_userId_key" ON "UserApiLimit"("userId");
