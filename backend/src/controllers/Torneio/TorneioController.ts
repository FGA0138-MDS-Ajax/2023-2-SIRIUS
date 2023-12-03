import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { TorneioProps } from '../../types/types'


const prisma = new PrismaClient()

export class TorneioController {
  async create(nome: TorneioProps) {

    const TorneioNameExists = await prisma.torneio.findUnique({ where: { nome } })

    if (TorneioNameExists) {
      return (null)
    }

    const newTorneio = await prisma.torneio.create({
      data: { nome },
    })

    if (!newTorneio) {
      return (null)
    }

    return (newTorneio)
  }

  async searchByName(nome: TorneioProps) {

    try {
      const torneio = await prisma.torneio.findUnique({ where: { nome: nome } })

      if (!torneio) {
        return (null)
      }

      return (torneio)
    }
    catch (error) {
      console.error('Error searching torneio:', error)
      return (null)
    }
  }

  async getTorneios(req: Request, res: Response) {
    const torneios = await prisma.torneio.findMany()

    if (!torneios) {
      return res.status(400).send('Nenhum torneio encontrado!')
    }

    return res.status(200).json(torneios)
  }
}

