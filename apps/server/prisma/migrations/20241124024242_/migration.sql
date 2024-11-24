/*
  Warnings:

  - You are about to drop the `ReadTimer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[book_id,user_id]` on the table `readingHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ReadTimer" DROP CONSTRAINT "ReadTimer_book_id_fkey";

-- DropForeignKey
ALTER TABLE "ReadTimer" DROP CONSTRAINT "ReadTimer_user_id_fkey";

-- DropTable
DROP TABLE "ReadTimer";

-- CreateIndex
CREATE UNIQUE INDEX "readingHistory_book_id_user_id_key" ON "readingHistory"("book_id", "user_id");
