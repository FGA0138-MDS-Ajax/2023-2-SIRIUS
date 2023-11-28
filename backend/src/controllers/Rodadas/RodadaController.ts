import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Classe Para Controle dos Métodos das Rodadas.
 */
export class RodadaController {
  /**
     * Método para Criação das Rodadas na DataBase.
     */
  async create(req: Request, res: Response) {
    const {id, torneioId, torneio, published, grupo} = req.body 
      
    const RodadasExists = await prisma.rodadas.findUnique({ where: { id } })
  
    if (RodadasExists) {
      return res.status(400).json({ error: 'Rodadas already exists!' })
    }
  
    const newRodadas = await prisma.rodadas.create({
      data: {id, torneioId, torneio, published, grupo},
    })

    if (!newRodadas) {
      return res.status(400).send('invalid round')
    }

    return res.status(201).json(newRodadas) 
  }

  /**
     * Método para Deleção dos Rodadas na DataBase.
     */
  async delete(req: Request, res: Response) {  

    const deleteRodadas = await prisma.rodadas.deleteMany({}) 

  } 
}  
