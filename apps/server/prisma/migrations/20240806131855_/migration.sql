-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "cover" TEXT,
    "protagonist" TEXT,
    "description" TEXT,
    "author" TEXT,
    "book_file" TEXT NOT NULL,
    "book_shelf_id" INTEGER,
    "md5" TEXT NOT NULL,
    "encoding" TEXT NOT NULL,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookShelf" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "create_timer" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "all_flag" BOOLEAN NOT NULL,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BookShelf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sex" TEXT NOT NULL DEFAULT '女',
    "email" TEXT,
    "avatar" TEXT NOT NULL,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_md5_key" ON "Book"("md5");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_book_shelf_id_fkey" FOREIGN KEY ("book_shelf_id") REFERENCES "BookShelf"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookShelf" ADD CONSTRAINT "BookShelf_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
