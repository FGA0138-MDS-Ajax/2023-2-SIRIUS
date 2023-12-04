import prisma from '../../../client'
import { IVencedorGrupoDataProps } from '../../types/types'
import { ParticipantesController } from '../Participantes/ParticipantesController'
import { GrupoController } from '../Grupos/GrupoController'

export class VencedorGrupoController {
  async create(dadosVencedor: IVencedorGrupoDataProps) {
    const { grupoID, participanteID, posicao } = dadosVencedor
    try {

      const grupoExiste = await new GrupoController().searchByID(grupoID)
      if (!grupoExiste) return null

      const participanteExiste = await new ParticipantesController().searchByID(participanteID)
      if (!participanteExiste) return null

      const newVencedorGrupo = await prisma.vencedorGrupo.create({
        data: { grupoID, participanteID, posicao }
      })

      if (!newVencedorGrupo) {
        return (null)
      }

      return (newVencedorGrupo)
    } catch (e) {
      console.log('Erro ao criar vencedor de grupo')
      return null
    }
  }

  async createVariosVencedores(dadosVencedores: IVencedorGrupoDataProps[]) {
    try {
      const participantesController = new ParticipantesController()
      for (const participante of dadosVencedores) {
        const participanteExiste = await participantesController.searchByID(participante.participanteID)
        console.log(participanteExiste)
        if (!participanteExiste) throw new Error('Participante nao existe')
      }
    }
    catch (e) {
      console.log(e)
      return null
    }

    try {
      const vencedores = await this.getVencedoresByGrupoID(dadosVencedores[0].grupoID)
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

    for (let i = 0; i < dadosVencedores.length; i++) {
      for (let j = i + 1; j < dadosVencedores.length; j++) {
        if (dadosVencedores[i].posicao === dadosVencedores[j].posicao) {
          return null
        }
      }
    }

    try {
      const createdVencedores = await prisma.vencedorGrupo.createMany({
        data: dadosVencedores,
        skipDuplicates: true,
      })

      return (createdVencedores)
    } catch (error) {
      console.log('Erro ao definir vencedores:', error)
      return (null)
    }
  }

  async getVencedoresByGrupoID(grupoID: string) {
    try {

      const vencedores = await prisma.vencedorGrupo.findMany({
        where: {
          grupoID: grupoID
        }
      })

      return (vencedores)
    } catch (e) {
      console.log('Erro ao obter vencedores por id de grupo')
      return null
    }
  }
}

