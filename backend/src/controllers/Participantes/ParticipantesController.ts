import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { IPlayerDataProps } from '../../types/types'

const prisma = new PrismaClient()

export class ParticipantesController {
  async create(participantesData: IPlayerDataProps[]) {
    try {
      const createdParticipantes = await prisma.participante.createMany({
        data: participantesData,
        skipDuplicates: true,
      })

      return (createdParticipantes)
    } catch (error) {
      console.error('Error creating participants:', error)
      return (null)
    }
  }

  async searchByInGameName(inGameName: string) {
    try {
      const participante = await prisma.participante.findUnique({ where: { inGameName } })

      if (!participante) {
        return (null)
      }

      return (participante)
    }
    catch (error) {
      console.error('Error searching participante:', error)
      return (null)
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
