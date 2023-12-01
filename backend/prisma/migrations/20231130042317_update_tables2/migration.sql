/*
  Warnings:

  - You are about to drop the column `grupoID` on the `Participante` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Participante" DROP CONSTRAINT "Participante_grupoID_fkey";

-- AlterTable
ALTER TABLE "Participante" DROP COLUMN "grupoID";
