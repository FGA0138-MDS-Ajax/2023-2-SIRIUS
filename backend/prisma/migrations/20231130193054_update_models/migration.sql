/*
  Warnings:

  - You are about to drop the `Vencedor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vencedor" DROP CONSTRAINT "Vencedor_participanteID_fkey";

-- DropForeignKey
ALTER TABLE "Vencedor" DROP CONSTRAINT "Vencedor_torneioID_fkey";

-- DropTable
DROP TABLE "Vencedor";

-- CreateTable
CREATE TABLE "VencedorTorneio" (
    "id" TEXT NOT NULL,
    "participanteID" TEXT NOT NULL,
    "torneioID" TEXT NOT NULL,
    "posicao" "EnumVencedorPosicao" NOT NULL,

    CONSTRAINT "VencedorTorneio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VencedorGrupo" (
    "id" TEXT NOT NULL,
    "participanteID" TEXT NOT NULL,
    "grupoID" TEXT NOT NULL,
    "posicao" "EnumVencedorPosicao" NOT NULL,

    CONSTRAINT "VencedorGrupo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VencedorTorneio" ADD CONSTRAINT "VencedorTorneio_participanteID_fkey" FOREIGN KEY ("participanteID") REFERENCES "Participante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VencedorTorneio" ADD CONSTRAINT "VencedorTorneio_torneioID_fkey" FOREIGN KEY ("torneioID") REFERENCES "Torneio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VencedorGrupo" ADD CONSTRAINT "VencedorGrupo_participanteID_fkey" FOREIGN KEY ("participanteID") REFERENCES "Participante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VencedorGrupo" ADD CONSTRAINT "VencedorGrupo_grupoID_fkey" FOREIGN KEY ("grupoID") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
