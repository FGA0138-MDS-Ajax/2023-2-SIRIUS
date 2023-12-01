import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// Classe Para Controle dos Métodos dos Participantes.
 
export class ParticipantesTorneioController {
  /**
     * Método para Criação dos Participantes na DataBase.
     */
  async create(req: Request, res: Response) {

    const {id, torneio, torneioId, participantestorneio} = req.body
      
    const ParticipanteTorneioExists = await prisma.participantesTorneio.findUnique({ where: { id } })
  
    if (ParticipanteTorneioExists) {
      return res.status(400).json({ error: 'Participante already exists!' })
    }
  
    const newParticipante = await prisma.participantes.create({
      data: {id, torneio, torneioId, participantestorneio},
    }) 
      
    if (!newParticipante) {
      return res.status(400).send('invalid participant')
    }

    return res.status(201).json(newParticipante)
  }
}  