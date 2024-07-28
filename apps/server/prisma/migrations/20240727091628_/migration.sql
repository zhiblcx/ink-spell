-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_book_shelf_id_fkey`;

-- DropForeignKey
ALTER TABLE `bookshelf` DROP FOREIGN KEY `BookShelf_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_book_shelf_id_fkey` FOREIGN KEY (`book_shelf_id`) REFERENCES `BookShelf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookShelf` ADD CONSTRAINT `BookShelf_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
