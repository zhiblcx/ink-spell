/*
  Warnings:

  - A unique constraint covering the columns `[book_id,user_id]` on the table `BookMark` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BookMark_book_id_user_id_key" ON "BookMark"("book_id", "user_id");
