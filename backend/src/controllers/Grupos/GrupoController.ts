import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class GrupoController {
  async create(req: Request, res: Response) {
    const { rodadaID } = req.body

    const newGrupo = await prisma.grupo.create({
      data: { rodadaID },
    })

    if (!newGrupo) {
      return res.status(400).send('Erro ao criar grupo!\n')
    }

    return res.status(201).json(newGrupo)
  }

  public calcularQuantidadeGrupos(Num_checkin: number): { jogadoresPorGrupo: number[] } {
    let quantidadeGrupos: number[]

    if (Num_checkin >= 17 && Num_checkin <= 21) {
      quantidadeGrupos = [6, 6, (Num_checkin === 17) ? 5 : 6]
    } else if (Num_checkin >= 25 && Num_checkin <= 28) {
      quantidadeGrupos = [7, 7, 6, 6]
    } else if (Num_checkin >= 33 && Num_checkin <= 35) {
      quantidadeGrupos = [(Num_checkin === 35) ? 5 : 6, 7, 7, 6, 6]
    } else if (Num_checkin === 41 || Num_checkin === 42) {
      quantidadeGrupos = [7, 7, 7, 7, 6, 6]
    } else if (Num_checkin === 49) {
      quantidadeGrupos = [7, 7, 7, 7, 7, 7, 7]
    } else if (Num_checkin % 8 === 0) {
      quantidadeGrupos = Array.from({ length: Num_checkin / 8 }, () => 8)
    } else {
      const gruposCom7 = Math.floor(Num_checkin / 8)
      const resto = Num_checkin % 8
      quantidadeGrupos = Array.from({ length: gruposCom7 }, () => 7)
      if (resto >= 1) {
        quantidadeGrupos.push(resto)
      }
    }

    const jogadoresPorGrupo = quantidadeGrupos.map((qtd) => (qtd === 7) ? 7 : 6)

    return { jogadoresPorGrupo }
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
