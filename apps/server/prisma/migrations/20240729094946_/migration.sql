/*
  Warnings:

  - Added the required column `all_flag` to the `BookShelf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookshelf` ADD COLUMN `all_flag` BOOLEAN NOT NULL;
