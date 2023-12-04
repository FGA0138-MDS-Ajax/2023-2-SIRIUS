-- CreateEnum
CREATE TYPE "EnumVencedorPosicao" AS ENUM ('PRIMEIRO', 'SEGUNDO', 'TERCEIRO', 'QUARTO');

-- CreateEnum
CREATE TYPE "EnumRodada" AS ENUM ('UM', 'DOIS', 'TRES', 'SEMIFINAL', 'FINAL');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Torneio" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Torneio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rodada" (
    "id" TEXT NOT NULL,
    "torneioID" TEXT NOT NULL,
    "numeroRodada" "EnumRodada" NOT NULL,

    CONSTRAINT "Rodada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grupo" (
    "id" TEXT NOT NULL,
    "rodadaID" TEXT NOT NULL,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipanteEmGrupo" (
    "id" TEXT NOT NULL,
    "participanteID" TEXT NOT NULL,
    "grupoID" TEXT NOT NULL,
    "torneioID" TEXT NOT NULL,
    "numeroRodada" "EnumRodada" NOT NULL,

    CONSTRAINT "ParticipanteEmGrupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participante" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "inGameName" TEXT NOT NULL,
    "checkedInAt" TEXT NOT NULL,
    "discordID" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Participante_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Torneio_id_key" ON "Torneio"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Torneio_nome_key" ON "Torneio"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Participante_inGameName_key" ON "Participante"("inGameName");

-- CreateIndex
CREATE UNIQUE INDEX "VencedorGrupo_posicao_key" ON "VencedorGrupo"("posicao");

-- AddForeignKey
ALTER TABLE "Rodada" ADD CONSTRAINT "Rodada_torneioID_fkey" FOREIGN KEY ("torneioID") REFERENCES "Torneio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grupo" ADD CONSTRAINT "Grupo_rodadaID_fkey" FOREIGN KEY ("rodadaID") REFERENCES "Rodada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipanteEmGrupo" ADD CONSTRAINT "ParticipanteEmGrupo_participanteID_fkey" FOREIGN KEY ("participanteID") REFERENCES "Participante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipanteEmGrupo" ADD CONSTRAINT "ParticipanteEmGrupo_grupoID_fkey" FOREIGN KEY ("grupoID") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipanteEmGrupo" ADD CONSTRAINT "ParticipanteEmGrupo_torneioID_fkey" FOREIGN KEY ("torneioID") REFERENCES "Torneio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VencedorTorneio" ADD CONSTRAINT "VencedorTorneio_participanteID_fkey" FOREIGN KEY ("participanteID") REFERENCES "Participante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VencedorTorneio" ADD CONSTRAINT "VencedorTorneio_torneioID_fkey" FOREIGN KEY ("torneioID") REFERENCES "Torneio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VencedorGrupo" ADD CONSTRAINT "VencedorGrupo_participanteID_fkey" FOREIGN KEY ("participanteID") REFERENCES "Participante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VencedorGrupo" ADD CONSTRAINT "VencedorGrupo_grupoID_fkey" FOREIGN KEY ("grupoID") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
