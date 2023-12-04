/*
  Warnings:

  - A unique constraint covering the columns `[numeroRodada]` on the table `ParticipanteEmGrupo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numeroRodada]` on the table `Rodada` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[posicao]` on the table `VencedorTorneio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ParticipanteEmGrupo_numeroRodada_key" ON "ParticipanteEmGrupo"("numeroRodada");

-- CreateIndex
CREATE UNIQUE INDEX "Rodada_numeroRodada_key" ON "Rodada"("numeroRodada");

-- CreateIndex
CREATE UNIQUE INDEX "VencedorTorneio_posicao_key" ON "VencedorTorneio"("posicao");
