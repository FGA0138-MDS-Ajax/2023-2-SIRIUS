import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

import { TorneioController } from '../Torneio/TorneioController'
import { ParticipantesController } from '../Participantes/ParticipantesController'

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

  async getParticipantesEmGrupo(req: Request, res: Response) {
    const participantesEmGrupo = await prisma.participanteEmGrupo.findMany()

    if (!participantesEmGrupo) {
      return res.status(400).send('Nenhum participante encontrado!')
    }

    return res.status(200).json(participantesEmGrupo)
  }

  async getGruposDeParticipante(req: Request, res: Response) {
    try {
      const torneio = (await new TorneioController().searchByName(req, res))

      if (!torneio) {
        return res.status(400).send('torneio nao encontrado!')
      }

      const participante = (await new ParticipantesController().searchByInGameName(req, res))

      if (!participante) {
        return res.status(400).send('participante nao encontrado!')
      }

      const grupos = await prisma.participanteEmGrupo.findMany({
        where: {
          participanteID: participante.id,
          torneioID: torneio.id
        },
        include: {
          grupo: true
        }
      })

      return res.status(200).json(grupos)
    }
    catch (error) {
      console.error('Error searching participante:', error)
      return res.status(500).send('Internal Server Error')
    }
  }
}
