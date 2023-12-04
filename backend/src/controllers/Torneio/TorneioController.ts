import { Request, Response } from 'express'
import prisma from '../../../client'
import { EnumRodada, IPlayerDataProps, IPlayerEmGrupoDataProps } from '../../types/types'
import { RodadaController } from '../Rodadas/RodadaController'
import { GrupoController } from '../Grupos/GrupoController'
import { ParticipantesController } from '../Participantes/ParticipantesController'
import { ParticipanteEmGrupoController } from '../ParticipanteEmGrupo/ParticipanteEmGrupoController'

export class TorneioController {
  async create(nome: string, participantesData: Array<IPlayerDataProps[]>) {
    console.log(nome, participantesData.length)
    const TorneioNameExists = await prisma.torneio.findUnique({ where: { nome } })

    if (TorneioNameExists) {
      return (null)
    }

    const newTorneio = await prisma.torneio.create({
      data: { nome },
    })

    console.log('criou torneio',newTorneio)

    if (!newTorneio) {
      return (null)
    }

    const rodadaController = new RodadaController()
    const newRodada = await rodadaController.create({ torneioID: newTorneio.id, numeroRodada: EnumRodada.UM })
    console.log('criou rodada',newRodada)
    if (!newRodada) {
      return (null)
    }

    const grupoController = new GrupoController()
    for (let i = 0; i < participantesData.length; i++) {
      const newGrupo = await grupoController.create(newRodada.id)
      console.log('criou grupo',newGrupo)
      if (!newGrupo) {
        return (null)
      }

      const participantesCriado = await new ParticipantesController().create(participantesData[i])
      console.log('criou participantes',participantesCriado)
      if (!participantesCriado) {
        return (null)
      }
      const participantes: IPlayerEmGrupoDataProps[] = participantesData[i].map((participante) => {
        return ({
          participanteID: participante.id,
          numeroRodada: EnumRodada.UM,
          grupoID: newGrupo.id,
          torneioID: newTorneio.id
        })
      })
      console.log('criou vetor de participantes',participantes.length)
      const participantesEmGrupoCriado = await new ParticipanteEmGrupoController().create(participantes)
      console.log('criou participantes em grupo',participantesEmGrupoCriado)
      if (!participantesEmGrupoCriado) {
        return (null)
      }
    }

    return (newTorneio)

  }

  async searchByName(nome: string) {

    try {

      if (!nome) {
        return (null)
      }

      const torneio = await prisma.torneio.findUnique({ where: { nome: nome } })

      if (!torneio) {
        return (null)
      }

      return (torneio)
    }
    catch (error) {
      console.error('Error searching torneio:', error)
      return (null)
    }
  }

  async getTorneios(req: Request, res: Response) {
    const torneios = await prisma.torneio.findMany(req.body)

    if (!torneios.length) {
      return res.status(400).send('Nenhum torneio encontrado!')
    }

    return res.status(200).json(torneios)
  }
}

