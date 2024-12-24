-- CreateTable
CREATE TABLE "System" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 1,
    "text" TEXT NOT NULL,
    "create_timer" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "System_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "System" ADD CONSTRAINT "System_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
