import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Classe Para Controle dos Métodos dos Participantes.
 */
export class ParticipantesController {
  /**
     * Método para Criação dos Participantes na DataBase.
     */
  async create(req: Request, res: Response) {

    const {id, teamname, ingamename, checkedinat, iddiscord, published, emailcon,  grupo, grupoId} = req.body
      
    const ParticipanteExists = await prisma.participantes.findUnique({ where: { id } })
  
    if (ParticipanteExists) {
      return res.status(400).json({ error: 'Participante already exists!' })
    }
  
    const newParticipante = await prisma.participantes.create({
      data: {id, teamname, ingamename, checkedinat, iddiscord, published, emailcon, grupo, grupoId},
    }) 
      
    if (!newParticipante) {
      return res.status(400).send('invalid participant')
    }

    return res.status(201).json(newParticipante)
  }
}  