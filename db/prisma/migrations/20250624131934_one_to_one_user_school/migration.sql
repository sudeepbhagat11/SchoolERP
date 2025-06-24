/*
  Warnings:

  - A unique constraint covering the columns `[createdBy]` on the table `School` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "School" ALTER COLUMN "createdBy" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "School_createdBy_key" ON "School"("createdBy");
