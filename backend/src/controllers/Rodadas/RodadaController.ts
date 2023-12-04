import { Request, Response } from 'express'
import prisma from '../../../client'
import { IRodadaDataProps } from '../../types/types'

export class RodadaController {
  async create({torneioID, numeroRodada}: IRodadaDataProps) {
    try {

      if (!torneioID) {
        return (null)
      }

      const rodadasTorneio = await this.getRodadasByTorneioID(torneioID)
      if (rodadasTorneio) {
        const rodada = rodadasTorneio.find((rodada) => rodada.numeroRodada === numeroRodada)
        if (rodada) {
          return (null)
        }
      }

      const newRodadas = await prisma.rodada.create({
        data: { torneioID, numeroRodada },
      })

      if (!newRodadas) {
        return (null)
      }

      return (newRodadas)
    } catch(e) {
      console.log('Erro ao criar rodada!')
      return null
    }

  }

  // Método para Deleção dos Rodadas na DataBase.

  async delete(id: string) {
    try {

      if (!id) {
        return (null)
      }

      const rodada = await prisma.rodada.findUnique({ where: { id } })

      if (!rodada) {
        return (null)
      }

      const deletedRodada = await prisma.rodada.delete({ where: { id } })

      return (deletedRodada)
    } catch(e) {
      console.log('Erro ao deletar rodada')
      return null
    }

  }

  async getRodadas(req: Request, res: Response) {
    try {

      const rodadas = await prisma.rodada.findMany()

      if (!rodadas) {
        return res.status(400).send('Nenhuma rodada encontrado!')
      }

      return res.status(200).json(rodadas)
    } catch(e) {
      console.log('Erro ao obter rodadas')
      return res.status(500).send('Nenhuma rodada encontrado!')
    }
  }

  async getRodadasByTorneioID(torneioID: string) {
    try {

      const rodadas = await prisma.rodada.findMany({
        where: {
          torneioID: torneioID
        }
      })

      if (!rodadas) {
        return (null)
      }

      return (rodadas)
    } catch(e) {
      console.log('Erro ao obter rodadas por id de torneio')
      return null
    }
  }
}
