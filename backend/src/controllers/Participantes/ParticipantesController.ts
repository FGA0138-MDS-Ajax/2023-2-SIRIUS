import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class ParticipantesController {
  async create(req: Request, res: Response) {

    const { id, teamName, inGameName, checkedInAt, idDiscord, email, grupo, grupoId } = req.body

    const ParticipanteExists = await prisma.participante.findUnique({ where: { id } })

    if (ParticipanteExists) {
      return res.status(400).json({ error: 'Participante already exists!' })
    }

    const newParticipante = await prisma.participante.create({
      data: { id, teamName, inGameName, checkedInAt, idDiscord, email, grupo, grupoId },
    })

    if (!newParticipante) {
      return res.status(400).send('invalid participant')
    }

    return res.status(201).json(newParticipante)
  }
}  