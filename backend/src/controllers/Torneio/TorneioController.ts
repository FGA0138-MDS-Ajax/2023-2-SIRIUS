import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export class TorneioController {
  async create(req: Request, res: Response) {
    const { nome } = req.body
      
    const TorneioExists = await prisma.torneio.findUnique({ where: { id } })
  
    if (TorneioExists) {
      return res.status(400).json({ error: 'Torneio already exists!' })
    }
  
    const newTorneio = await prisma.torneio.create({
      data: {id, datatorneio, vencedor, rodada},
    }) 
  
    if (!newTorneio) {
      return res.status(400).send('invalid tournament')
    }

    return res.status(201).json(newTorneio)
  }

}  

