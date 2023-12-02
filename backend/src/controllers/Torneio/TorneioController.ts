import { Request, Response } from 'express'
import prisma from '../../../client'

export class TorneioController {
  async create(nome: string) {

    if (!nome) {
      return (null)
    }

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

  async searchByName(nome: string) {

    try {

      if (!nome) {
        return (null)
      }

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
    const torneios = await prisma.torneio.findMany(req.body)

    if (!torneios.length) {
      return res.status(400).send('Nenhum torneio encontrado!')
    }

    return res.status(200).json(torneios)
  }
}

