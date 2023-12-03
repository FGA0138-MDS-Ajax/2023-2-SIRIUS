import { Request, Response } from 'express'
import prisma from '../../../client'
import { TorneioController } from '../Torneio/TorneioController'
import { ParticipantesController } from '../Participantes/ParticipantesController'
import { IPlayerEmGrupoDataProps } from '../../types/types'

export class ParticipanteEmGrupoController {
  async create(participantesEmGrupoData: IPlayerEmGrupoDataProps[]) {
    try {

      if (!participantesEmGrupoData) {
        return (null)
      }

      const createdParticipantes = await prisma.participanteEmGrupo.createMany({
        data: participantesEmGrupoData,
        skipDuplicates: true,
      })

      if (!createdParticipantes || createdParticipantes.count === 0) {
        return (null)
      }

      return (createdParticipantes)

    } catch (error) {
      return (null)
    }
  }

  async searchGruposDeParticipante(participantesEmGrupoData: IPlayerEmGrupoDataProps[]) {
    const torneioController = new TorneioController()
    const participantesController = new ParticipantesController()

    if (!participantesEmGrupoData) {
      return (null)
    }

    const torneio = await torneioController.searchByName(participantesEmGrupoData[0].torneioID)
    if (!torneio) {
      return (null)
    }

    const participantes = await participantesController.searchByInGameName(participantesEmGrupoData[0].participanteID)

    if (!participantes) {
      return (null)
    }


    const grupos = await prisma.participanteEmGrupo.findMany({
      where: {
        torneioID: torneio.id,
        participanteID: participantes.id
      }
    })

    return (grupos)

  }

  async getParticipantesEmGrupo(req: Request, res: Response) {
    const participantesEmGrupo = await prisma.participanteEmGrupo.findMany()

    if (!participantesEmGrupo) {
      return res.status(400).send('Nenhum participante encontrado!')
    }

    return res.status(200).json(participantesEmGrupo)
  }
}
