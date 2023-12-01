import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class RodadaController {
  async create(torneioID: string) {

    const newRodadas = await prisma.rodada.create({
      data: { torneioID },
    })

    if (!newRodadas) {
      return (null)
    }

    return (newRodadas)
  }

  // Método para Deleção dos Rodadas na DataBase.

  async delete(id: string) {
    const rodada = await prisma.rodada.findUnique({ where: { id } })

    if (!rodada) {
      return (null)
    }

    const deletedRodada = await prisma.rodada.delete({ where: { id } })

    return (deletedRodada)
  }
}
