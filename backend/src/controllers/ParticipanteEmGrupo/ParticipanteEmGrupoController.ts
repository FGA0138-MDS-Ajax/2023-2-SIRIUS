import { Request, Response } from 'express'
import prisma from '../../../client'
import { TorneioController } from '../Torneio/TorneioController'
import { ParticipantesController } from '../Participantes/ParticipantesController'
import { IPlayerEmGrupoDataProps, IBuscaPlayerEmGrupoProps } from '../../types/types'

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

  async searchGruposDeParticipante(participantesEmGrupoData: IBuscaPlayerEmGrupoProps) {
    try {
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

      const participantesNoGrupo = (await prisma.participanteEmGrupo.findMany({
        where: {
          grupoID: grupoID
        }
      }))
      const participantesNoGrupoData = []
      for (const participante of participantesNoGrupo) {
        const participanteData = await participantesController.searchByID(participante.participanteID)
        participantesNoGrupoData.push(participanteData?.inGameName)
      }
      return (participantesNoGrupoData)
    } catch (e) {
      console.log('Erro ao obter grupos de participantes.')
      return null
    }
  }

  async getParticipantesEmGrupo(req: Request, res: Response) {
    try {

      const participantesEmGrupo = await prisma.participanteEmGrupo.findMany()

      if (!participantesEmGrupo) {
        return res.status(400).send('Nenhum participante encontrado!')
      }

      return res.status(200).json(participantesEmGrupo)
    }
    catch (e) {
      const msgErro = 'Erro ao obter participantes em grupo'
      console.log(msgErro)
      return res.status(500).send(msgErro)
    }
  }
}
