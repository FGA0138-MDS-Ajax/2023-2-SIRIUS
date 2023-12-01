/*
  Warnings:

  - You are about to drop the column `idRodada` on the `Grupo` table. All the data in the column will be lost.
  - You are about to drop the column `grupoId` on the `Participante` table. All the data in the column will be lost.
  - You are about to drop the column `idDiscord` on the `Participante` table. All the data in the column will be lost.
  - You are about to drop the column `torneioId` on the `Rodada` table. All the data in the column will be lost.
  - You are about to drop the column `datatorneio` on the `Torneio` table. All the data in the column will be lost.
  - You are about to drop the column `vencedor` on the `Torneio` table. All the data in the column will be lost.
  - You are about to drop the column `participanteId` on the `Vencedor` table. All the data in the column will be lost.
  - You are about to drop the column `torneioId` on the `Vencedor` table. All the data in the column will be lost.
  - You are about to drop the `ParticipanteParticipaGrupo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rodadaID` to the `Grupo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dicordID` to the `Participante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grupoID` to the `Participante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `torneioID` to the `Rodada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Torneio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participanteID` to the `Vencedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `torneioID` to the `Vencedor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Grupo" DROP CONSTRAINT "Grupo_idRodada_fkey";

-- DropForeignKey
ALTER TABLE "Participante" DROP CONSTRAINT "Participante_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipanteParticipaGrupo" DROP CONSTRAINT "ParticipanteParticipaGrupo_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipanteParticipaGrupo" DROP CONSTRAINT "ParticipanteParticipaGrupo_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "Rodada" DROP CONSTRAINT "Rodada_torneioId_fkey";

-- DropForeignKey
ALTER TABLE "Vencedor" DROP CONSTRAINT "Vencedor_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "Vencedor" DROP CONSTRAINT "Vencedor_torneioId_fkey";

-- AlterTable
ALTER TABLE "Grupo" DROP COLUMN "idRodada",
ADD COLUMN     "rodadaID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Participante" DROP COLUMN "grupoId",
DROP COLUMN "idDiscord",
ADD COLUMN     "dicordID" TEXT NOT NULL,
ADD COLUMN     "grupoID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rodada" DROP COLUMN "torneioId",
ADD COLUMN     "torneioID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Torneio" DROP COLUMN "datatorneio",
DROP COLUMN "vencedor",
ADD COLUMN     "dataTorneio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nome" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vencedor" DROP COLUMN "participanteId",
DROP COLUMN "torneioId",
ADD COLUMN     "participanteID" TEXT NOT NULL,
ADD COLUMN     "torneioID" TEXT NOT NULL;

-- DropTable
DROP TABLE "ParticipanteParticipaGrupo";

-- CreateTable
CREATE TABLE "ParticipanteEmGrupo" (
    "id" TEXT NOT NULL,
    "participanteID" TEXT NOT NULL,
    "grupoID" TEXT NOT NULL,

    CONSTRAINT "ParticipanteEmGrupo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rodada" ADD CONSTRAINT "Rodada_torneioID_fkey" FOREIGN KEY ("torneioID") REFERENCES "Torneio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grupo" ADD CONSTRAINT "Grupo_rodadaID_fkey" FOREIGN KEY ("rodadaID") REFERENCES "Rodada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipanteEmGrupo" ADD CONSTRAINT "ParticipanteEmGrupo_participanteID_fkey" FOREIGN KEY ("participanteID") REFERENCES "Participante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipanteEmGrupo" ADD CONSTRAINT "ParticipanteEmGrupo_grupoID_fkey" FOREIGN KEY ("grupoID") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participante" ADD CONSTRAINT "Participante_grupoID_fkey" FOREIGN KEY ("grupoID") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vencedor" ADD CONSTRAINT "Vencedor_participanteID_fkey" FOREIGN KEY ("participanteID") REFERENCES "Participante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vencedor" ADD CONSTRAINT "Vencedor_torneioID_fkey" FOREIGN KEY ("torneioID") REFERENCES "Torneio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
