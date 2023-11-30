/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Torneio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Torneio_nome_key" ON "Torneio"("nome");
