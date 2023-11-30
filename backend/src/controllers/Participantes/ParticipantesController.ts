import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class ParticipantesController {
  async createVariosParticipantes(req: Request, res: Response) {
    const participantesData = req.body.participantes

    try {
      const createdParticipantes = await prisma.participante.createMany({
        data: participantesData,
        skipDuplicates: true,
      })

      return res.status(201).json(createdParticipantes)
    } catch (error) {
      console.error('Error creating participants:', error)
      return res.status(500).send('Internal Server Error')
    }
  }
}
