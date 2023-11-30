/*
  Warnings:

  - You are about to drop the column `dicordID` on the `Participante` table. All the data in the column will be lost.
  - You are about to drop the column `winner` on the `Participante` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Participante` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discordID` to the `Participante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participante" DROP COLUMN "dicordID",
DROP COLUMN "winner",
ADD COLUMN     "discordID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Participante_email_key" ON "Participante"("email");
