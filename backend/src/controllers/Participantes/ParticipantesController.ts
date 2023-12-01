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

  async searchByInGameName(req: Request, res: Response) {
    const { inGameName } = req.body

    try {
      const participante = await prisma.participante.findUnique({ where: { inGameName } })

      if (!participante) {
        return res.status(400).send('participante nao encontrado!')
      }

      return res.status(200).json(participante)
    }
    catch (error) {
      console.error('Error searching participante:', error)
      return res.status(500).send('Internal Server Error')
    }
  }

  async getParticipantes(req: Request, res: Response) {
    const participantes = await prisma.participante.findMany()

    if (!participantes) {
      return res.status(400).send('Nenhum participante encontrado!')
    }

    return res.status(200).json(participantes)
  }
}
