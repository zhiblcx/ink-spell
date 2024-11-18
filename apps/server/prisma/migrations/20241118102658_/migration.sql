/*
  Warnings:

  - A unique constraint covering the columns `[username,oauth]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account,oauth]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_account_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "oauth" TEXT NOT NULL DEFAULT 'local';

-- CreateIndex
CREATE UNIQUE INDEX "User_username_oauth_key" ON "User"("username", "oauth");

-- CreateIndex
CREATE UNIQUE INDEX "User_account_oauth_key" ON "User"("account", "oauth");
