/*
  Warnings:

  - Added the required column `resultId` to the `Circuit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Circuit" ADD COLUMN     "resultId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Circuit" ADD CONSTRAINT "Circuit_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
