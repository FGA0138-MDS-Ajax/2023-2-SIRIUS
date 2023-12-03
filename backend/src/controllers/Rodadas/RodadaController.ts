import { Request, Response } from 'express'
import prisma from '../../../client'

export class RodadaController {
  async create(torneioID: string) {

    if (!torneioID) {
      return (null)
    }

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

    if (!id) {
      return (null)
    }

    const rodada = await prisma.rodada.findUnique({ where: { id } })

    if (!rodada) {
      return (null)
    }

    const deletedRodada = await prisma.rodada.delete({ where: { id } })

    return (deletedRodada)
  }
}
