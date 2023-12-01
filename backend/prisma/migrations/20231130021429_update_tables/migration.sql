/*
  Warnings:

  - You are about to drop the `Grupos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Participantes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rodadas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Grupos" DROP CONSTRAINT "Grupos_idRodada_fkey";

-- DropForeignKey
ALTER TABLE "Participantes" DROP CONSTRAINT "Participantes_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "Rodadas" DROP CONSTRAINT "Rodadas_torneioId_fkey";

-- DropTable
DROP TABLE "Grupos";

-- DropTable
DROP TABLE "Participantes";

-- DropTable
DROP TABLE "Rodadas";

-- CreateTable
CREATE TABLE "Rodada" (
    "id" TEXT NOT NULL,
    "torneioId" TEXT NOT NULL,

    CONSTRAINT "Rodada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grupo" (
    "id" TEXT NOT NULL,
    "idRodada" TEXT NOT NULL,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participante" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "inGameName" TEXT NOT NULL,
    "checkedInAt" TEXT NOT NULL,
    "idDiscord" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,

    CONSTRAINT "Participante_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rodada" ADD CONSTRAINT "Rodada_torneioId_fkey" FOREIGN KEY ("torneioId") REFERENCES "Torneio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grupo" ADD CONSTRAINT "Grupo_idRodada_fkey" FOREIGN KEY ("idRodada") REFERENCES "Rodada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participante" ADD CONSTRAINT "Participante_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
