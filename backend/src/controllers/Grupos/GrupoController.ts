import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class GrupoController {
  async create(req: Request, res: Response) {
    const { id, rodada, idRodada, participante } = req.body

    const GrupoExists = await prisma.grupos.findUnique({ where: { id } })

    if (GrupoExists) {
      return res.status(400).json({ error: 'Grupo already exists!' })
    }

    const newGrupo = await prisma.grupos.create({
      data: { id, rodada, idRodada, participante },
    })

    if (!newGrupo) {
      return res.status(400).send('invalid group')
    }

    return res.status(201).json(newGrupo)

  }

  public calcularQuantidadeGrupos(Num_checkin: number): { jogadoresPorGrupo: number[] } {
    let quantidadeGrupos: number[]
    let jogadoresPorGrupo: number[]

    console.log('Num_checkin', Num_checkin)

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

    console.log('quantidadeGrupos', quantidadeGrupos)

    jogadoresPorGrupo = quantidadeGrupos.map((qtd) => (qtd === 7) ? 7 : 6)

    console.log('jogadoresPorGrupo', jogadoresPorGrupo)

    return { jogadoresPorGrupo }
  }

  calcularQuantidadeGruposHandler(req: Request, res: Response): void {
    console.log('req.params', req.params)
    const { Num_checkin } = req.params

    console.log('Num_checkin', Num_checkin)
    console.log('+Num_checkin', +Num_checkin)
    try {
      const { jogadoresPorGrupo } = this.calcularQuantidadeGrupos(+(Num_checkin))
      res.status(200).json({ jogadoresPorGrupo })
    } catch (error) {
      res.status(400).json({ error: 'Erro ao calcular a quantidade de grupos.' })
    }
  }
}
