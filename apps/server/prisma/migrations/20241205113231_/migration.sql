-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name_chinese" TEXT NOT NULL,
    "name_english" TEXT NOT NULL,
    "create_timer" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookShelfToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_chinese_name_english_key" ON "Tag"("name_chinese", "name_english");

-- CreateIndex
CREATE UNIQUE INDEX "_BookShelfToTag_AB_unique" ON "_BookShelfToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_BookShelfToTag_B_index" ON "_BookShelfToTag"("B");

-- AddForeignKey
ALTER TABLE "_BookShelfToTag" ADD CONSTRAINT "_BookShelfToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "BookShelf"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookShelfToTag" ADD CONSTRAINT "_BookShelfToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
