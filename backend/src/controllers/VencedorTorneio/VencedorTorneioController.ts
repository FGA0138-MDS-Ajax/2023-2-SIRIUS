import { PrismaClient } from '@prisma/client'
import { IVencedorTorneioDataProps } from '../../types/types'

const prisma = new PrismaClient()

export class VencedorTorneioController {

  async createVariosVencedores(dadosVencedores: IVencedorTorneioDataProps[]) {
    try {
      const createdVencedores = await prisma.vencedorTorneio.createMany({
        data: dadosVencedores,
        skipDuplicates: true,
      })

      return (createdVencedores)
    } catch (error) {
      console.error('Erro ao definir vencedores do torneio:', error)
      return (null)
    }
  }

  async getVencedoresByTorneioID(torneioID: string) {
    const vencedores = await prisma.vencedorTorneio.findMany({
      where: {
        torneioID: torneioID
      }
    })

    return (vencedores)
  }
}

