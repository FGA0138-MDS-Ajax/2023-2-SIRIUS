import { Request, Response } from 'express'
import { RodadaController } from './RodadaController'
import { prismaMock } from '../../../singleton'
import { EnumRodada, IRodadaDataProps, IPlayerEmGrupoDataProps } from '../../types/types'

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
      const rodadaTeste: IRodadaDataProps = {
        numeroRodada: EnumRodada.UM,
        torneioID: ''
      };

      const createrodada = await rodadaController.create(rodadaTeste);

      expect(createrodada).toBeNull();
    });

    it('should return "rodada" if create was a success', async () => {
      const newRodada: IRodadaDataProps = {
        numeroRodada: EnumRodada.DOIS,
        torneioID: '2'
      };

      jest.spyOn(prismaMock.rodada, 'findMany').mockResolvedValueOnce([{
        id: '1',
        torneioID: '2',
        numeroRodada: EnumRodada.UM,
      }])


      jest.spyOn(prismaMock.rodada, 'create').mockResolvedValueOnce({
        id: '1',
        torneioID: '2',
        numeroRodada: EnumRodada.UM,
      })

      await rodadaController.create(newRodada)

      expect(prismaMock.rodada.create).toHaveBeenCalledWith({ data: { numeroRodada: EnumRodada.DOIS, torneioID: '2' } })

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
        torneioID: '1',
        numeroRodada: EnumRodada.UM
      })

      jest.spyOn(prismaMock.rodada, 'delete').mockResolvedValueOnce({
        id: '1',
        torneioID: '1',
        numeroRodada: EnumRodada.UM
      })

      const deleteRodada = await rodadaController.delete(id)

      expect(deleteRodada).toHaveProperty('torneioID')
      expect(deleteRodada?.torneioID).toBe('1')
    })

  })

  describe('getRodadas', () => {

    it('should return 200 if "findMany" returns true', async () => {
      jest.spyOn(prismaMock.rodada, 'findMany').mockResolvedValueOnce([{
        id: '1',
        torneioID: '1',
        numeroRodada: EnumRodada.UM
      }])

      await rodadaController.getRodadas(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith([{
        id: '1',
        torneioID: '1',
        numeroRodada: EnumRodada.UM
      }])
    })

  })

  describe('getRodadasByTorneioID', () => {

    it('should return null if "findMany" returns false', async () => {
      const torneioID = ''

      const rodadas = await rodadaController.getRodadasByTorneioID(torneioID)

      expect(rodadas).toBeNull()
    })

    it('should return "rodadas" if "findMany" returns true', async () => {
      const torneioID = '1'

      jest.spyOn(prismaMock.rodada, 'findMany').mockResolvedValueOnce([{
        id: '1',
        torneioID: '1',
        numeroRodada: EnumRodada.UM
      }])

      const rodadas = await rodadaController.getRodadasByTorneioID(torneioID)

      expect(rodadas).toEqual([{
        id: '1',
        torneioID: '1',
        numeroRodada: EnumRodada.UM
      }])
    })

  })

})
