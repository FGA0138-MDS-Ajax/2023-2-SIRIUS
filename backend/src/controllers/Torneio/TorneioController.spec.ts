import { Request, Response } from 'express'
import { TorneioController } from './TorneioController'
import { prismaMock } from './../../mocks/prismaMock'

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
    it('should return 400 if tournament already exists', async () => {
      // Mock do método create do Prisma
      jest.spyOn(prismaMock.torneio, 'create').mockResolvedValueOnce({ /* Dados do torneio existente */ })

      await torneioController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Torneio Existente')
    })

    it('should return 400 if tournament is invalid', async () => {
      req.body = { fileContents: 'invalid tournament' }

      await torneioController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Torneio Inválido')
    })

  })
})
