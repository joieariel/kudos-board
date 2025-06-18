/*
  Warnings:

  - You are about to drop the `_BoardToCard` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `boardId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BoardToCard" DROP CONSTRAINT "_BoardToCard_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoardToCard" DROP CONSTRAINT "_BoardToCard_B_fkey";

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "boardId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_BoardToCard";

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
