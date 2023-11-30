import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class ParticipanteEmGrupoController {
  async create(req: Request, res: Response) {

    const participantesEmGrupoData = req.body.participanteEmGrupo

    try {
      const createdParticipantes = await prisma.participanteEmGrupo.createMany({
        data: participantesEmGrupoData,
        skipDuplicates: true,
      })

      return res.status(201).json(createdParticipantes)
    } catch (error) {
      console.error('Error creating participants:', error)
      return res.status(500).send('Internal Server Error')
    }
  }
}

/* 
[
    { grupoid: number; playerid: number; }, { ...},
] 
*/