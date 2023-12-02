import { Request, Response } from 'express'
import { GrupoController } from './GrupoController'
import { prismaMock } from '../../../singleton'

describe('Testes unitários para Controle de Dados na Tabela Grupos', () => {
  let grupoController: GrupoController
  let req: Request
  let res: Response

  beforeEach(() => {
    grupoController = new GrupoController()
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response
  })


  describe('create', () => {
    it('should return null if group is invalid', async () => {
      const gruponovo = ''

      const creategrupo = await grupoController.create(gruponovo)

      expect(creategrupo).toBeNull()
    })

    // Erro de Foreign Key Constraint
    it('should return newGrupo if group is valid', async () => {
      jest.spyOn(prismaMock.grupo, 'create').mockResolvedValueOnce({
        id: '1',
        rodadaID: '1'
      })
      const grupoteste = await grupoController.create('1')

      expect(grupoteste).toHaveProperty('rodadaID')
      expect(grupoteste?.rodadaID).toBe('1')
    })
  })

  describe('calcularQuantidadeGrupos', () => {
    it('should return 3 groups with 6 and 5 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(17)
      expect(result).toEqual({ jogadoresPorGrupo: [6, 6, 5] })
    })

    it('should return 3 groups with 6 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(18)
      expect(result).toEqual({ jogadoresPorGrupo: [6, 6, 6] })
    })

    it('should return 3 groups with 7 and 6 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(19)
      expect(result).toEqual({ jogadoresPorGrupo: [7, 6, 6] })
    })

    it('should return 3 groups with 7 and 6 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(20)
      expect(result).toEqual({ jogadoresPorGrupo: [7, 7, 6] })
    })

    it('should return 3 groups with 7 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(21)
      expect(result).toEqual({ jogadoresPorGrupo: [7, 7, 7] })
    })

    it('should return 4 groups with 7 and 6 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(25)
      expect(result).toEqual({ jogadoresPorGrupo: [7, 6, 6, 6] })
    })

    it('should return 4 groups with 7 and 6 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(26)
      expect(result).toEqual({ jogadoresPorGrupo: [7, 7, 6, 6] })
    })

    it('should return 4 groups with 7 and 6 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(27)
      expect(result).toEqual({ jogadoresPorGrupo: [7, 7, 7, 6] })
    })

    it('should return 4 groups with 7 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(28)
      expect(result).toEqual({ jogadoresPorGrupo: [7, 7, 7, 7] })
    })

    it('should return 5 groups with 7 and 6 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(33)
      expect(result).toEqual({ jogadoresPorGrupo: [7, 7, 7, 6, 6] })
    })

    it('should return 5 groups with 7 and 6 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(34)
      expect(result).toEqual({ jogadoresPorGrupo: [7, 7, 7, 7, 6] })
    })

    it('should return 5 groups with 7 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(35)
      expect(result).toEqual({ jogadoresPorGrupo: [7, 7, 7, 7, 7] })
    })

    it('should return 6 groups with 7 and 6 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(41)
      expect(result).toEqual({ jogadoresPorGrupo: [7, 7, 7, 7, 6, 6] })
    })

    it('should return 6 groups with 7 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(42)
      expect(result).toEqual({ jogadoresPorGrupo: [7, 7, 7, 7, 7, 7] })
    })

    it('should return 7 groups with 7 players each', async () => {
      const result = grupoController.calcularQuantidadeGrupos(49)
      expect(result).toEqual({ jogadoresPorGrupo: [7, 7, 7, 7, 7, 7, 7] })
    })

    it('should return 4 groups with a number divisible by 8', async () => {
      const result = grupoController.calcularQuantidadeGrupos(32)
      expect(result).toEqual({ jogadoresPorGrupo: [8, 8, 8, 8] })
    })

    /*
    it('should return 5 groups with a number not divisible by 8', async () => {
      const result = grupoController.calcularQuantidadeGrupos(37)
      expect(result).toEqual({ jogadoresPorGrupo: [7,7,7,7,5] })
    })
    */

  })

  describe('calcularQuantidadeGruposHandler', () => {
    it('should return 400 if group is invalid', async () => {
      req.params = { Num_checkin: '1' }
      await grupoController.calcularQuantidadeGruposHandler(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao calcular a quantidade de grupos.' })
    })

    it('should return 200 if group is valid', async () => {
      req.params = { Num_checkin: '17' }
      await grupoController.calcularQuantidadeGruposHandler(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ jogadoresPorGrupo: [6, 6, 5] })
    })
  })
})