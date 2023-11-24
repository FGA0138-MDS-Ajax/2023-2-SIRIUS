import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
let id: string;
let torneioid: string; 
let published: boolean;  
let grupo: Array<string>=[];
let torneio: string; 

const prisma = new PrismaClient()

/**
 * Classe Para Controle dos Métodos das Rodadas.
 */
export class RodadaController {
    /**
     * Método para Criação das Rodadas na DataBase.
     */
    async create(req: Request, res: Response) {
      const {id, torneioId, torneio, published, grupo} = req.body 
      
      const RodadasExists = await prisma.rodadas.findUnique({ where: { id } })
  
      if (RodadasExists) {
        return res.status(400).json({ error: 'Rodadas already exists!' })
      }
  
      const newRodadas = await prisma.rodadas.create({
        data: {id, torneioId, torneio, published, grupo},
      }) 
  
      return res.status(201).json(newRodadas) 
    }
}  
