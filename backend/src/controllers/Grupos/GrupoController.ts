import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
/**
 * Classe Para Controle dos Métodos dos Grupos.
 */
export class GrupoController {
  /**
     * Método para Criação dos Grupos na DataBase.
     */
  async create(req: Request, res: Response) {
    const {id, grupos, published, rodada, rodadaId, participante} = req.body
      
    const GrupoExists = await prisma.grupos.findUnique({ where: { id } })
      
    if (GrupoExists) {
      return res.status(400).json({ error: 'Grupo already exists!' })
    }
  
    const newGrupo = await prisma.grupos.create({
      data: {id, grupos, published, rodada, rodadaId, participante},
    }) 
  
    if (!newGrupo) {
      return res.status(400).send('invalid group')
    }

    return res.status(201).json(newGrupo)

  } 
    
  /**
     * Método para Deleção dos Grupos na DataBase.
     */
  async delete(req: Request, res: Response) {  

    const deleteGrupos = await prisma.grupos.deleteMany({}) 

  } 
}
