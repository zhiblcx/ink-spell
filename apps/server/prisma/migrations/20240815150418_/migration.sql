/*
  Warnings:

  - Added the required column `type` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL;
