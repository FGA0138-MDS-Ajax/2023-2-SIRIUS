-- CreateTable
CREATE TABLE "ParticipanteParticipaGrupo" (
    "id" TEXT NOT NULL,
    "participanteId" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,

    CONSTRAINT "ParticipanteParticipaGrupo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParticipanteParticipaGrupo" ADD CONSTRAINT "ParticipanteParticipaGrupo_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "Participante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipanteParticipaGrupo" ADD CONSTRAINT "ParticipanteParticipaGrupo_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
