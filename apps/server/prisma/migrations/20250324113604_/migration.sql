-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'UNREVIEWED', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "BookShelf" ADD COLUMN     "review" "ReviewStatus" DEFAULT 'UNREVIEWED';
