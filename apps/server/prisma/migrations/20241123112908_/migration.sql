/*
  Warnings:

  - The `read_time` column on the `readingHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "readingHistory" DROP COLUMN "read_time",
ADD COLUMN     "read_time" INTEGER;
