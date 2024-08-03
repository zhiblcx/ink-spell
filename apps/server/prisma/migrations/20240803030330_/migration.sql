-- AlterTable
ALTER TABLE `book` ADD COLUMN `is_delete` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `bookshelf` ADD COLUMN `is_delete` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `is_delete` BOOLEAN NOT NULL DEFAULT false;
