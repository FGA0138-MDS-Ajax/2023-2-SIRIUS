import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export class TorneioController {
  async create(req: Request, res: Response) {
    const { nome } = req.body

    console.log(nome)
      
    const TorneioNameExists = await prisma.torneio.findUnique({ where: { nome } })
  
    if (TorneioNameExists) {
      return res.status(400).json({ error: 'Torneio ja existe!' })
    }
  
    const newTorneio = await prisma.torneio.create({
      data: { nome },
    }) 
  
    if (!newTorneio) {
      return res.status(400).send('Torneio invalido!')
    }

    return res.status(201).json(newTorneio)
  }

  async searchByName(req: Request, res: Response) {
    const { nome } = req.body

    try {
      const torneio = await prisma.torneio.findUnique({ where: { nome:nome } })

      if (!torneio) {
        return res.status(400).send('Torneio nao encontrado!')
      }

      return res.status(200).json(torneio)
    }
    catch (error) {
      console.error('Error searching torneio:', error)
      return res.status(500).send('Internal Server Error')
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

