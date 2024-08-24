/*
  Warnings:

  - A unique constraint covering the columns `[user_id,book_shelf_id]` on the table `CollectBookShelf` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CollectBookShelf_user_id_book_shelf_id_key" ON "CollectBookShelf"("user_id", "book_shelf_id");
