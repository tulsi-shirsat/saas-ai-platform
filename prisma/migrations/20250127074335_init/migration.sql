-- CreateTable
CREATE TABLE "userapilimit" (
    "id" SERIAL NOT NULL,
    "userid" VARCHAR(255) NOT NULL,
    "count" INTEGER DEFAULT 0,

    CONSTRAINT "userapilimit_pkey" PRIMARY KEY ("id")
);
