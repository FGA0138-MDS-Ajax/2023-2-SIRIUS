/*
  Warnings:

  - A unique constraint covering the columns `[torneioId]` on the table `ParticipantesTorneio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[torneioId]` on the table `Rodadas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ParticipantesTorneio_torneioId_key" ON "ParticipantesTorneio"("torneioId");

-- CreateIndex
CREATE UNIQUE INDEX "Rodadas_torneioId_key" ON "Rodadas"("torneioId");
