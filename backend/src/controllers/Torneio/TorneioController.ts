import { Request, Response } from 'express'
import prisma from '../../../client'
import { EnumRodada, IPlayerDataProps, IPlayerEmGrupoDataProps } from '../../types/types'
import { RodadaController } from '../Rodadas/RodadaController'
import { GrupoController } from '../Grupos/GrupoController'
import { ParticipantesController } from '../Participantes/ParticipantesController'
import { ParticipanteEmGrupoController } from '../ParticipanteEmGrupo/ParticipanteEmGrupoController'

export class TorneioController {
  async create(nome: string, participantesData: Array<IPlayerDataProps[]>) {
      try {

          const TorneioNameExists = await prisma.torneio.findUnique({ where: { nome } })

          if (TorneioNameExists) {
              return (null)
          }

          const newTorneio = await prisma.torneio.create({
              data: { nome },
          })


          if (!newTorneio) {
              return (null)
          }

          const rodadaController = new RodadaController()
          const newRodada = await rodadaController.create({ torneioID: newTorneio.id, numeroRodada: EnumRodada.UM })
          if (!newRodada) {
              return (null)
          }

          const grupoController = new GrupoController()
          for (let i = 0; i < participantesData.length; i++) {
              const newGrupo = await grupoController.create(newRodada.id)
              if (!newGrupo) {
                  return (null)
              }

              const participantesCriado = await new ParticipantesController().create(participantesData[i])
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
              const participantesEmGrupoCriado = await new ParticipanteEmGrupoController().create(participantes)
              if (!participantesEmGrupoCriado) {
                  return (null)
              }
          }

          return (newTorneio)
      } catch(e) {
          console.log('Erro ao criar torneio')
          return null
      }

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
      try {

          const torneios = await prisma.torneio.findMany(req.body)

          if (!torneios.length) {
              return res.status(400).send('Nenhum torneio encontrado!')
          }

          return res.status(200).json(torneios)
      } catch(e) {
          console.log('Erro ao obter torneios!')
          return res.status(500).send('Erro ao obter torneios!')
      }
  }
}

