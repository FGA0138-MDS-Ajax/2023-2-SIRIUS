import { Request, Response } from 'express'
import prisma from '../../../client'
import { GrupoProps } from '../../types/types'

export class GrupoController {
  async create(rodadaID: GrupoProps) {

    if (!rodadaID) {
      return (null)
    }

    try {
      const newGrupo = await prisma.grupo.create({
        data: { rodadaID },
      })

      if (!newGrupo) {
        return (null)
      }

      return (newGrupo)
    } catch (e) {
      console.log('Erro ao criar grupo.')
      return null
    }
  }

  public calcularQuantidadeGrupos(Num_checkin: number): { jogadoresPorGrupo: number[] } {
    if (Num_checkin < 16 && Num_checkin !== 12) {
      throw new Error('Erro ao calcular a quantidade de grupos.')
    }

    switch (Num_checkin) {
      case 12:
        return { jogadoresPorGrupo: [6, 6] }
      case 17:
        return { jogadoresPorGrupo: [6, 6, 5] }
      case 18:
        return { jogadoresPorGrupo: [6, 6, 6] }
      case 19:
        return { jogadoresPorGrupo: [7, 6, 6] }
      case 20:
        return { jogadoresPorGrupo: [7, 7, 6] }
      case 21:
        return { jogadoresPorGrupo: [7, 7, 7] }
      case 25:
        return { jogadoresPorGrupo: [7, 6, 6, 6] }
      case 26:
        return { jogadoresPorGrupo: [7, 7, 6, 6] }
      case 27:
        return { jogadoresPorGrupo: [7, 7, 7, 6] }
      case 28:
        return { jogadoresPorGrupo: [7, 7, 7, 7] }
      case 33:
        return { jogadoresPorGrupo: [7, 7, 7, 6, 6] }
      case 34:
        return { jogadoresPorGrupo: [7, 7, 7, 7, 6] }
      case 35:
        return { jogadoresPorGrupo: [7, 7, 7, 7, 7] }
      case 41:
        return { jogadoresPorGrupo: [7, 7, 7, 7, 6, 6] }
      case 42:
        return { jogadoresPorGrupo: [7, 7, 7, 7, 7, 7] }
      case 49:
        return { jogadoresPorGrupo: [7, 7, 7, 7, 7, 7, 7] }
      default:
        if (Num_checkin % 8 === 0) {
          const quantidade = Num_checkin / 8
          return { jogadoresPorGrupo: Array(quantidade).fill(8) }
        } else {
          const gruposCom7 = 8 - (Num_checkin % 8)

          const gruposTotais = (Num_checkin + gruposCom7) / 8

          let gruposCom8 = gruposTotais - gruposCom7

          const jogadoresPorGrupo = Array(gruposCom7).fill(7)

          while (gruposCom8--) {
            jogadoresPorGrupo.push(8)
          }

          return { jogadoresPorGrupo }
        }
    }
  }

  calcularQuantidadeGruposHandler(req: Request, res: Response): void {
    const { Num_checkin } = req.params

    try {
      const { jogadoresPorGrupo } = this.calcularQuantidadeGrupos(+(Num_checkin))
      res.status(200).json({ jogadoresPorGrupo })
    } catch (error) {
      res.status(500).json({ error: 'Erro ao calcular a quantidade de grupos.' })
    }
  }

  async getGrupos(req: Request, res: Response) {
    try {
      const grupo = await prisma.grupo.findMany()

      if (!grupo) {
        return res.status(400).send('Nenhum grupo encontrado!')
      }

      return res.status(200).json(grupo)
    } catch (e) {
      console.log('Erro ao obter grupos.')
      return res.status(500).send('Erro interno do servidor.')
    }
  }

  async searchByID(id: string) {
    try {
      const grupo = await prisma.grupo.findUnique({ where: { id } })

      if (!grupo) {
        return (null)
      }

      return (grupo)
    }
    catch (error) {
      console.error('Error searching grupo:', error)
      return (null)
    }
  }
}
