/*
  Warnings:

  - You are about to drop the column `positionIndex` on the `Results` table. All the data in the column will be lost.
  - Added the required column `positionText` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Results" DROP COLUMN "positionIndex",
ADD COLUMN     "positionText" TEXT NOT NULL;
