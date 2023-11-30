import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class ParticipantesController {
  async create(req: Request, res: Response) {

    const { id, teamName, inGameName, checkedInAt, discordID, email } = req.body
    const ParticipanteExists = await prisma.participante.findUnique({ where: { id } })

    if (ParticipanteExists) {
      return res.status(400).json({ error: 'O participante já existe.' })
    }

    const newParticipante = await prisma.participante.create({
      data: { id, teamName, inGameName, checkedInAt, discordID, email },
    })

    if (!newParticipante) {
      return res.status(400).send('Erro ao criar participante')
    }

    return res.status(201).json(newParticipante)
  }
}  
