import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { PlayerData } from './type'

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
      data: {id, grupos, rodada, idRodada, participante},
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


  public calcularQuantidadeGrupos(Num_checkin: number): { jogadoresPorGrupo: number[] } {
    let quantidadeGrupos: number[];
    let jogadoresPorGrupo: number[];

    if (Num_checkin >= 17 && Num_checkin <= 21) {
      quantidadeGrupos = [6, 6, (Num_checkin === 17) ? 5 : 6];
    } else if (Num_checkin >= 25 && Num_checkin <= 28) {
      quantidadeGrupos = [7, 7, 6, 6];
    } else if (Num_checkin >= 33 && Num_checkin <= 35) {
      quantidadeGrupos = [(Num_checkin === 35) ? 5 : 6, 7, 7, 6, 6];
    } else if (Num_checkin === 41 || Num_checkin === 42) {
      quantidadeGrupos = [7, 7, 7, 7, 6, 6];
    } else if (Num_checkin === 49) {
      quantidadeGrupos = [7, 7, 7, 7, 7, 7, 7];
    } else if (Num_checkin % 8 === 0) {
      quantidadeGrupos = Array.from({ length: Num_checkin / 8 }, () => 8);
    } else {
      const gruposCom7 = Math.floor(Num_checkin / 8);
      const resto = Num_checkin % 8;
      quantidadeGrupos = Array.from({ length: gruposCom7 }, () => 7);
      if (resto >= 1) {
        quantidadeGrupos.push(resto);
      }
    }

    jogadoresPorGrupo = quantidadeGrupos.map((qtd) => (qtd === 7) ? 7 : 6);

    return { jogadoresPorGrupo };
  }

  calcularQuantidadeGruposHandler(req: Request, res: Response): void {
    const { Num_checkin } = req.params;

    try {
      const { jogadoresPorGrupo } = this.calcularQuantidadeGrupos(Number(Num_checkin));
      res.status(200).json({ jogadoresPorGrupo });
    } catch (error) {
      res.status(400).json({ error: 'Erro ao calcular a quantidade de grupos.' });
    }
  }
}
