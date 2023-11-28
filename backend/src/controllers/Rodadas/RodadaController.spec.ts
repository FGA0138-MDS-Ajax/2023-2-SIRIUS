import { Request, Response } from 'express'
import { RodadaController } from './RodadaController'
import { PrismaClient } from '@prisma/client'

jest.mock('@prisma/client')

const prismaMock = new PrismaClient() as jest.Mocked<PrismaClient>

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
    it('should return 400 if round already exists', async () => {
      // Mock do método create do Prisma
      jest.spyOn(prismaMock.rodadas, 'create').mockResolvedValueOnce({ /* Dados da rodada existente */ })

      await rodadaController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Rodada Existente')
    })

    it('should return 400 if round is invalid', async () => {
      req.body = { fileContents: 'invalid round' }

      await rodadaController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Rodada Inválida')
    })

    // Adicione mais testes conforme necessário
  })
})
