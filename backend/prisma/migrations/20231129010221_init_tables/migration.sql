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
    "datatorneio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vencedor" TEXT[],

    CONSTRAINT "Torneio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rodadas" (
    "id" TEXT NOT NULL,
    "torneioId" TEXT NOT NULL,

    CONSTRAINT "Rodadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grupos" (
    "id" TEXT NOT NULL,
    "grupos" TEXT NOT NULL,
    "idRodada" TEXT NOT NULL,

    CONSTRAINT "Grupos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participantes" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "inGameName" TEXT NOT NULL,
    "checkedInAt" TEXT NOT NULL,
    "idDiscord" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,

    CONSTRAINT "Participantes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Torneio_id_key" ON "Torneio"("id");

-- AddForeignKey
ALTER TABLE "Rodadas" ADD CONSTRAINT "Rodadas_torneioId_fkey" FOREIGN KEY ("torneioId") REFERENCES "Torneio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grupos" ADD CONSTRAINT "Grupos_idRodada_fkey" FOREIGN KEY ("idRodada") REFERENCES "Rodadas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participantes" ADD CONSTRAINT "Participantes_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
