/*
  Warnings:

  - You are about to drop the column `status` on the `BookShelf` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookShelf" DROP COLUMN "status",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
