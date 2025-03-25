/*
  Warnings:

  - Made the column `review` on table `BookShelf` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BookShelf" ALTER COLUMN "review" SET NOT NULL;
