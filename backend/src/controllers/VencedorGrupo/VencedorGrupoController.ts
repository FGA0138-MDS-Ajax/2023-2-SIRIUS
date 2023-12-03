import { PrismaClient } from '@prisma/client'
import { IVencedorGrupoDataProps } from '../../types/types'
import { ParticipantesController } from '../Participantes/ParticipantesController'
import { GrupoController } from '../Grupos/GrupoController'

const prisma = new PrismaClient()

export class VencedorGrupoController {
  async create(dadosVencedor: IVencedorGrupoDataProps) {
    const { grupoID, participanteID, posicao } = dadosVencedor

    const grupoExiste = new GrupoController().searchByID(grupoID)
    if(!grupoExiste) return null

    const participanteExiste = new ParticipantesController().searchByID(participanteID)
    if(!participanteExiste) return null

    const newVencedorGrupo = await prisma.vencedorGrupo.create({
      data: { grupoID, participanteID, posicao }
    })

    if (!newVencedorGrupo) {
      return (null)
    }

    return (newVencedorGrupo)
  }

  async createVariosVencedores(dadosVencedores: IVencedorGrupoDataProps[]) {
    try {
      dadosVencedores.forEach(async (vencedor) => { await this.create(vencedor) })
    } catch (error) {
      console.error('Erro ao definir vencedores', error)
      return (null)
    }
  }
}

