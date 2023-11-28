import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

/**
 * Classe Para Controle dos Métodos dos Torneios.
 */
export class TorneioController {
  /**
     * Método para Criação dos Torneios na DataBase.
     */
  async create(req: Request, res: Response) {
    const {id, datatorneio, vencedor, rodada} = req.body
      
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

