-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rolesId" TEXT NOT NULL DEFAULT 'user';

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
