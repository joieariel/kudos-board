/*
  Warnings:

  - You are about to drop the column `description` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the `_BoardToCard` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `author` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gifTitle` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gifUrl` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BoardToCard" DROP CONSTRAINT "_BoardToCard_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoardToCard" DROP CONSTRAINT "_BoardToCard_B_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "description",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "gifTitle" TEXT NOT NULL,
ADD COLUMN     "gifUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BoardToCard";
