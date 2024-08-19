/*
  Warnings:

  - Added the required column `cover` to the `BookShelf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookShelf" ADD COLUMN     "cover" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '暂无描述';
