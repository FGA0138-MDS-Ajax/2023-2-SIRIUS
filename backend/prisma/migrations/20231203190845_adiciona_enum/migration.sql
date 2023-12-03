/*
  Warnings:

  - Added the required column `numeroRodada` to the `ParticipanteEmGrupo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParticipanteEmGrupo" ADD COLUMN     "numeroRodada" "EnumRodada" NOT NULL;
