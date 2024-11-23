-- CreateTable
CREATE TABLE "readingHistory" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3) NOT NULL,
    "readTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "readingHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "readingHistory" ADD CONSTRAINT "readingHistory_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readingHistory" ADD CONSTRAINT "readingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
