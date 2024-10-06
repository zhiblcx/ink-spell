-- CreateTable
CREATE TABLE "BookMark" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "catalog" INTEGER[],

    CONSTRAINT "BookMark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookMark" ADD CONSTRAINT "BookMark_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookMark" ADD CONSTRAINT "BookMark_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
