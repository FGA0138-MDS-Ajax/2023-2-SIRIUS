import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class RodadaController {
  async create(req: Request, res: Response) {
    const {id, torneioId, torneio } = req.body 
      
    const RodadasExists = await prisma.rodada.findUnique({ where: { id } })
  
    if (RodadasExists) {
      return res.status(400).json({ error: 'Rodadas already exists!' })
    }
  
    const newRodadas = await prisma.rodada.create({
      data: { id, torneioId, torneio },
    })

    if (!newRodadas) {
      return res.status(400).send('invalid round')
    }

    return res.status(201).json(newRodadas) 
  }

  // Método para Deleção dos Rodadas na DataBase.

  async handle(request: Request, response: Response) {
    const { id } = request.params

    const rodada = await prisma.rodada.findUnique({ where: { id } })

    if (!rodada) {
      return response.status(404).json({ error: 'Rodada not found' })
    }

    const deletedRodada = await prisma.rodada.delete({ where: { id } })

    return response.json(deletedRodada)
  }
}
