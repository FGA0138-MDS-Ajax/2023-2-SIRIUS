import { Request, Response } from 'express'
import prisma from '../../../client'
import { error } from 'node:console'

export class GrupoController {
  async create(rodadaID: string) {

    if (!rodadaID) {
      return (null)
    }
    const newGrupo = await prisma.grupo.create({
      data: { rodadaID },
    })

    if (!newGrupo) {
      return (null)
    }

    return (newGrupo)
  }

  public calcularQuantidadeGrupos(Num_checkin: number): { jogadoresPorGrupo: number[] } {
    switch (Num_checkin) {
      case 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9 || 10 || 11 || 12 || 13 || 14 || 15 || 16:
        throw new Error('Erro ao calcular a quantidade de grupos.');
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
          const gruposCom7 = Math.floor(Num_checkin / 8)
          const resto = Num_checkin % 8
          const jogadoresPorGrupo = Array(gruposCom7).fill(7)
          if (resto >= 1) {
            jogadoresPorGrupo.push(resto)
          }
          // Analizar com os meninos
          // Inserir validação para os 2 ultimos arrais para este caso (esta vindo errado, Ex: Num_checkin === 37)
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
      res.status(400).json({ error: 'Erro ao calcular a quantidade de grupos.' })
    }
  }
}
