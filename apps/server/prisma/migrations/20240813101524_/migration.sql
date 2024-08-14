/*
  Warnings:

  - A unique constraint covering the columns `[md5,user_id]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Book_md5_book_shelf_id_key";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "user_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Book_md5_user_id_key" ON "Book"("md5", "user_id");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
