import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class RodadaController {
  async create(req: Request, res: Response) {
    const { torneioID } = req.body 
      
    const newRodadas = await prisma.rodada.create({
      data: { torneioID },
    })

    if (!newRodadas) {
      return res.status(400).send('Erro ao criar rodada!\n')
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
