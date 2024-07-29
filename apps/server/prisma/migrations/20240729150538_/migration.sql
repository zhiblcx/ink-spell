/*
  Warnings:

  - Added the required column `encoding` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `encoding` VARCHAR(191) NOT NULL;
