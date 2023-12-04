import { PrismaClient } from '@prisma/client'
import { IVencedorGrupoDataProps } from '../../types/types'
import { ParticipantesController } from '../Participantes/ParticipantesController'
import { GrupoController } from '../Grupos/GrupoController'

const prisma = new PrismaClient()

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
      const createdVencedores = await prisma.vencedorGrupo.createMany({
        data: dadosVencedores,
        skipDuplicates: true,
      })

      return (createdVencedores)
    } catch (error) {
      console.error('Erro ao definir vencedores:', error)
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
      } catch(e) {
          console.log('Erro ao obter vencedores por id de grupo')
          return null
      }
  }
}

