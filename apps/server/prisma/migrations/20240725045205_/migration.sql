-- AlterTable
ALTER TABLE `book` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `cover` VARCHAR(191) NULL,
    MODIFY `protagonist` VARCHAR(191) NULL,
    MODIFY `detail` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `sex` VARCHAR(191) NOT NULL DEFAULT '女',
    MODIFY `email` VARCHAR(191) NULL;
