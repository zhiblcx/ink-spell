/*
  Warnings:

  - You are about to drop the column `bookFile` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `bookShelfId` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `detail` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `createTimer` on the `bookshelf` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `bookshelf` table. All the data in the column will be lost.
  - Added the required column `book_file` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `create_timer` to the `BookShelf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `BookShelf` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_bookShelfId_fkey`;

-- DropForeignKey
ALTER TABLE `bookshelf` DROP FOREIGN KEY `BookShelf_userId_fkey`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `bookFile`,
    DROP COLUMN `bookShelfId`,
    DROP COLUMN `detail`,
    ADD COLUMN `author` VARCHAR(191) NULL,
    ADD COLUMN `book_file` VARCHAR(191) NOT NULL,
    ADD COLUMN `book_shelf_id` INTEGER NULL,
    ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `bookshelf` DROP COLUMN `createTimer`,
    DROP COLUMN `userId`,
    ADD COLUMN `create_timer` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_book_shelf_id_fkey` FOREIGN KEY (`book_shelf_id`) REFERENCES `BookShelf`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookShelf` ADD CONSTRAINT `BookShelf_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
