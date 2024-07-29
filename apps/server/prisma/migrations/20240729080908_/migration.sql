/*
  Warnings:

  - A unique constraint covering the columns `[md5]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Book_md5_key` ON `Book`(`md5`);
