import { Request, Response } from 'express'
import prisma from '../../../client'
import { IRodadaDataProps } from '../../types/types'

export class RodadaController {
  async create({ torneioID, numeroRodada }: IRodadaDataProps) {

    if (!torneioID) {
      return (null)
    }

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

  async getRodadas(req: Request, res: Response) {
    const rodadas = await prisma.rodada.findMany()

    if (!rodadas) {
      return res.status(400).send('Nenhuma rodada encontrado!')
    }

    return res.status(200).json(rodadas)
  }
}
