import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export class TorneioController {
  async create(req: Request, res: Response) {
    const { nome } = req.body
      
    const TorneioNameExists = await prisma.torneio.findUnique({ where: { nome } })
  
    if (TorneioNameExists) {
      return res.status(400).json({ error: 'Torneio ja existe!' })
    }
  
    const newTorneio = await prisma.torneio.create({
      data: { nome },
    }) 
  
    if (!newTorneio) {
      return res.status(400).send('Toneio invalido!')
    }

    return res.status(201).json(newTorneio)
  }
}  

