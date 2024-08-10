/*
  Warnings:

  - Added the required column `position` to the `BookShelf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookShelf" ADD COLUMN     "position" INTEGER NOT NULL;
