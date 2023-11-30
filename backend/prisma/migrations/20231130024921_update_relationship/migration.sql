-- CreateEnum
CREATE TYPE "EnumVencedorPosicao" AS ENUM ('PRIMEIRO', 'SEGUNDO', 'TERCEIRO', 'QUARTO');

-- CreateTable
CREATE TABLE "Vencedor" (
    "id" TEXT NOT NULL,
    "participanteId" TEXT NOT NULL,
    "torneioId" TEXT NOT NULL,
    "posicao" "EnumVencedorPosicao" NOT NULL,

    CONSTRAINT "Vencedor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vencedor" ADD CONSTRAINT "Vencedor_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "Participante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vencedor" ADD CONSTRAINT "Vencedor_torneioId_fkey" FOREIGN KEY ("torneioId") REFERENCES "Torneio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
