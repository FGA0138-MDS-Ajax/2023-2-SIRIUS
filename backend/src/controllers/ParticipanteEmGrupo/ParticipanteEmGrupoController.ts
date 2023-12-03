import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

import { TorneioController } from '../Torneio/TorneioController'
import { ParticipantesController } from '../Participantes/ParticipantesController'
import { IPlayerEmGrupoDataProps, IBuscaPlayerEmGrupoProps } from '../../types/types'

const prisma = new PrismaClient()

export class ParticipanteEmGrupoController {
  async create(participantesEmGrupoData: IPlayerEmGrupoDataProps[]) {
    try {
      const createdParticipantes = await prisma.participanteEmGrupo.createMany({
        data: participantesEmGrupoData,
        skipDuplicates: true,
      })

      return (createdParticipantes)
    } catch (error) {
      console.error('Error creating participants:', error)
      return (null)
    }
  }

  async searchGruposDeParticipante(participantesEmGrupoData: IBuscaPlayerEmGrupoProps) {
    const torneioController = new TorneioController()
    const participantesController = new ParticipantesController()

    const torneio = await torneioController.searchByName(participantesEmGrupoData.nomeTorneio)
    if (!torneio) {
      return (null)
    }

    const participantes = await participantesController.searchByInGameName(participantesEmGrupoData.inGameName)
    if (!participantes) {
      return (null)
    }

    const grupos = await prisma.participanteEmGrupo.findMany({
      where: {
        torneioID: torneio.id,
        participanteID: participantes.id,
        numeroRodada: participantesEmGrupoData.numeroRodada
      }
    })

    if (!grupos) {
      return (null)
    }

    const grupoID = grupos[0].grupoID

    return (await prisma.participanteEmGrupo.findMany({
      where: {
        grupoID: grupoID
      }
    }))
    
  }

  async getParticipantesEmGrupo(req: Request, res: Response) {
    const participantesEmGrupo = await prisma.participanteEmGrupo.findMany()

    if (!participantesEmGrupo) {
      return res.status(400).send('Nenhum participante encontrado!')
    }

    return res.status(200).json(participantesEmGrupo)
  }
}
