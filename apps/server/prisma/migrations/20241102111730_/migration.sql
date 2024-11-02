-- CreateTable
CREATE TABLE "ReadTimer" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3) NOT NULL,
    "sum_timer" INTEGER NOT NULL DEFAULT 0,
    "chapter_read" INTEGER NOT NULL,

    CONSTRAINT "ReadTimer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReadTimer" ADD CONSTRAINT "ReadTimer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadTimer" ADD CONSTRAINT "ReadTimer_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
