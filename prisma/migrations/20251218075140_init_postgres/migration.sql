-- CreateTable
CREATE TABLE "FigmaFile" (
    "id" TEXT NOT NULL,
    "featureName" TEXT NOT NULL,
    "fileName" TEXT,
    "figmaUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "isFrequentlyUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FigmaFile_pkey" PRIMARY KEY ("id")
);
