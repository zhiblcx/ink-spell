/*
  Warnings:

  - A unique constraint covering the columns `[md5,book_shelf_id]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Book_md5_key";

-- CreateIndex
CREATE UNIQUE INDEX "Book_md5_book_shelf_id_key" ON "Book"("md5", "book_shelf_id");
