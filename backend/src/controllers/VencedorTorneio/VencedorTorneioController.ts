import { PrismaClient } from '@prisma/client'
import { IVencedorTorneioDataProps } from '../../types/types'
import { ParticipantesController } from '../Participantes/ParticipantesController'

const prisma = new PrismaClient()

export class VencedorTorneioController {

  async createVariosVencedores(dadosVencedores: IVencedorTorneioDataProps[]) {
    try {
      const participantesController = new ParticipantesController()
      for (const participante of dadosVencedores) {
        const participanteExiste = await participantesController.searchByID(participante.participanteID)
        if (!participanteExiste) throw new Error('Participante nao existe')
      }
    }
    catch (e) {
      console.log(e)
      return null
    }

    try {
      const vencedores = await this.getVencedoresByTorneioID(dadosVencedores[0].torneioID)
      if (vencedores) {
        for (let i = 0; i < dadosVencedores.length; i++) {
          const vencedorExiste = vencedores.find((vencedor) => vencedor.posicao === dadosVencedores[i].posicao)
          if (vencedorExiste) return null
        }
      }
    }
    catch (e) {
      console.log(e)
      return null
    }

    for(let i = 0; i < dadosVencedores.length; i++) {
      for(let j = i+1; j < dadosVencedores.length; j++) {
        if(dadosVencedores[i].posicao === dadosVencedores[j].posicao) {
          return null
        }
      }
    }

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
    try {

      const vencedores = await prisma.vencedorTorneio.findMany({
        where: {
          torneioID: torneioID
        }
      })

      return (vencedores)
    } catch(e) {
      console.log('Erro ao obter vencedores por id de torneio')
      return null
    }
  }
}

