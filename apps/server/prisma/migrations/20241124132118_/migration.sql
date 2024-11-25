/*
  Warnings:

  - You are about to drop the `readingHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "readingHistory" DROP CONSTRAINT "readingHistory_book_id_fkey";

-- DropForeignKey
ALTER TABLE "readingHistory" DROP CONSTRAINT "readingHistory_user_id_fkey";

-- DropTable
DROP TABLE "readingHistory";

-- CreateTable
CREATE TABLE "ReadingHistory" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3),
    "read_time" INTEGER,

    CONSTRAINT "ReadingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReadingHistory_book_id_user_id_key" ON "ReadingHistory"("book_id", "user_id");

-- AddForeignKey
ALTER TABLE "ReadingHistory" ADD CONSTRAINT "ReadingHistory_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingHistory" ADD CONSTRAINT "ReadingHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
