-- CreateTable
CREATE TABLE "CollectBookShelf" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_shelf_id" INTEGER NOT NULL,

    CONSTRAINT "CollectBookShelf_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollectBookShelf" ADD CONSTRAINT "CollectBookShelf_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectBookShelf" ADD CONSTRAINT "CollectBookShelf_book_shelf_id_fkey" FOREIGN KEY ("book_shelf_id") REFERENCES "BookShelf"("id") ON DELETE CASCADE ON UPDATE CASCADE;
