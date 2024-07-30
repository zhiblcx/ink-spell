/*
  Warnings:

  - A unique constraint covering the columns `[label,user_id]` on the table `BookShelf` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `BookShelf_label_user_id_key` ON `BookShelf`(`label`, `user_id`);
