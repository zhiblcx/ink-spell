/*
  Warnings:

  - Added the required column `is_delete` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Follow" ADD COLUMN     "is_delete" BOOLEAN NOT NULL;
