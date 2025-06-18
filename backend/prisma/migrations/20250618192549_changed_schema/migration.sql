-- CreateTable
CREATE TABLE "_BoardToCard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BoardToCard_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BoardToCard_B_index" ON "_BoardToCard"("B");

-- AddForeignKey
ALTER TABLE "_BoardToCard" ADD CONSTRAINT "_BoardToCard_A_fkey" FOREIGN KEY ("A") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardToCard" ADD CONSTRAINT "_BoardToCard_B_fkey" FOREIGN KEY ("B") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
