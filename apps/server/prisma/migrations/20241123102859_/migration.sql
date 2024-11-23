/*
  Warnings:

  - You are about to drop the column `bookId` on the `readingHistory` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `readingHistory` table. All the data in the column will be lost.
  - You are about to drop the column `readTime` on the `readingHistory` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `readingHistory` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `readingHistory` table. All the data in the column will be lost.
  - Added the required column `book_id` to the `readingHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `readingHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `read_time` to the `readingHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `readingHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "readingHistory" DROP CONSTRAINT "readingHistory_bookId_fkey";

-- DropForeignKey
ALTER TABLE "readingHistory" DROP CONSTRAINT "readingHistory_userId_fkey";

-- AlterTable
ALTER TABLE "readingHistory" DROP COLUMN "bookId",
DROP COLUMN "endTime",
DROP COLUMN "readTime",
DROP COLUMN "startTime",
DROP COLUMN "userId",
ADD COLUMN     "book_id" INTEGER NOT NULL,
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "read_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "readingHistory" ADD CONSTRAINT "readingHistory_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readingHistory" ADD CONSTRAINT "readingHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
