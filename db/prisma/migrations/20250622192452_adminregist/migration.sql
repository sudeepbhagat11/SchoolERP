-- AlterTable
ALTER TABLE "School" ADD COLUMN     "createdBy" TEXT NOT NULL DEFAULT 'admin';

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
