import { PrismaClient } from '@prisma/client'
import { IRodadaDataProps } from '../../types/types'

const prisma = new PrismaClient()

export class RodadaController {
  async create({torneioID, numeroRodada}: IRodadaDataProps) {

    const newRodadas = await prisma.rodada.create({
      data: { torneioID, numeroRodada },
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
