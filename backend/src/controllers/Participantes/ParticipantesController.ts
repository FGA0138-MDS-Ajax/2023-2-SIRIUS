import { Request, Response } from 'express'
import prisma from '../../../client'
import { IPlayerDataProps } from '../../types/types'

export class ParticipantesController {
  async create(participantesData: IPlayerDataProps[]) {
    try {


      console.log(participantesData.length)
      if (participantesData.length === 0) {
        return null
      }
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
    try {

      const participantes = await prisma.participante.findMany()

      if (!participantes) {
        return res.status(400).send('Nenhum participante encontrado!')
      }

      return res.status(200).json(participantes)
    } catch (e) {
      console.log('Erro ao obter participantes')
      return res.status(500).send('Erro ao obter participantes')
    }
  }

  async searchByID(id: string) {

    try {
      const participante = await prisma.participante.findUnique({ where: { id } })

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
}
