import { Request, Response } from 'express'
import { RodadaController } from './RodadaController'
import { prismaMock } from '../../../singleton'

describe('Testes unitários para Controle de Dados na Tabela Rodadas', () => {
  let rodadaController: RodadaController
  let req: Request
  let res: Response

  beforeEach(() => {
    rodadaController = new RodadaController()
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response
  })

  describe('create', () => {

    it('should return null if "torneioID" is invalid', async () => {
      const newRodada = ''

      const createrodada = await rodadaController.create(newRodada)

      expect(createrodada).toBeNull()
    })

    it('should return "rodada" if create was a success', async () => {
      const newRodada = '1'

      jest.spyOn(prismaMock.rodada, 'create').mockResolvedValueOnce({
        id: '1',
        torneioID: newRodada
      })

      await rodadaController.create(newRodada)

      expect(prismaMock.rodada.create).toHaveBeenCalledWith({
        data: { torneioID: newRodada },
      })
    })

  })

  describe('delete', () => {

    it('should return null if "id" is invalid', async () => {
      const id = ''

      const deleteRodada = await rodadaController.delete(id)

      expect(deleteRodada).toBeNull()
    })

    it('should return "rodada" if delete was a success', async () => {
      const id = '1'

      jest.spyOn(prismaMock.rodada, 'findUnique').mockResolvedValueOnce({
        id: '1',
        torneioID: '1'
      })

      jest.spyOn(prismaMock.rodada, 'delete').mockResolvedValueOnce({
        id: '1',
        torneioID: '1'
      })

      const deleteRodada = await rodadaController.delete(id)

      expect(deleteRodada).toHaveProperty('torneioID')
      expect(deleteRodada?.torneioID).toBe('1')
    })

  })
})
