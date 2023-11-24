import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

let id: string;
let grupo: string;
let published: boolean;
let rodada: string;
let rodadaId: string;
let participante: Array<string>=[];

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
  
      return res.status(201).json(newGrupo)
    }
}  

