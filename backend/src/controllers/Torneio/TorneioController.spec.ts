import { Request, Response } from 'express'
import { TorneioController } from './TorneioController'
import { prismaMock } from '../../../singleton'

describe('Testes unitários para Controle de Dados na Tabela Torneios', () => {
  let torneioController: TorneioController
  let req: Request
  let res: Response

  beforeEach(() => {
    torneioController = new TorneioController()
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response
  })

  describe('create', () => {

    it('should return null if "nome" is invalid', async () => {
      const newTorneio = ''

      const createtorneio = await torneioController.create(newTorneio)

      expect(createtorneio).toBeNull()
    })


    it('should return null if "findUnique" returns true', async () => {
      const newTorneio = 'Teste'

      jest.spyOn(prismaMock.torneio, 'findUnique').mockResolvedValueOnce({
        id: '1',
        nome: newTorneio
      })

      const createdTorneio = await torneioController.create(newTorneio)

      expect(createdTorneio).toBeNull()
      expect(prismaMock.torneio.findUnique).toHaveBeenCalledWith({ where: { nome: newTorneio } })
    })

    it('should return "torneio" if create was a success', async () => {
      const newTorneio = 'Teste'

      jest.spyOn(prismaMock.torneio, 'create').mockResolvedValueOnce({
        id: '1',
        nome: newTorneio
      })

      await torneioController.create(newTorneio)

      expect(prismaMock.torneio.create).toHaveBeenCalledWith({
        data: { nome: newTorneio },
      })
    })

  })

  describe('searchByName', () => {

    it('should return null if "nome" is invalid', async () => {
      const nome = ''

      const torneio = await torneioController.searchByName(nome)

      expect(torneio).toBeNull()
    })

    it('should return null if "findUnique" returns false', async () => {
      const nome = 'Teste'

      jest.spyOn(prismaMock.torneio, 'findUnique').mockResolvedValueOnce(null)

      const torneio = await torneioController.searchByName(nome)

      expect(torneio).toBeNull()
      expect(prismaMock.torneio.findUnique).toHaveBeenCalledWith({ where: { nome } })
    })

    it('should return "torneio" if "findUnique" returns true', async () => {
      const nome = 'Teste'

      jest.spyOn(prismaMock.torneio, 'findUnique').mockResolvedValueOnce({
        id: '1',
        nome: nome
      })

      const torneio = await torneioController.searchByName(nome)

      expect(torneio).toEqual({
        id: '1',
        nome: nome
      })
      expect(prismaMock.torneio.findUnique).toHaveBeenCalledWith({ where: { nome } })
    })

  })

  describe('getTorneios', () => {

    it('should return 400 if "findMany" returns false', async () => {
      req.body = { nome: 'teste' }

      jest.spyOn(prismaMock.torneio, 'findMany').mockResolvedValueOnce([])

      await torneioController.getTorneios(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Nenhum torneio encontrado!')
    })

    it('should return 200 if "findMany" returns true', async () => {
      jest.spyOn(prismaMock.torneio, 'findMany').mockResolvedValueOnce([{
        id: '1',
        nome: 'Teste'
      }])

      await torneioController.getTorneios(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith([{
        id: '1',
        nome: 'Teste'
      }])
    })

  })
})
