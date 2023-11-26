import { Request, Response } from 'express'
import { beforeEach } from 'node:test'
import { TorneioController } from './Torneiocontroller'

describe('Testes unitários para Controle de Dados na Tabela Torneios', () => {
  let torneiocontroller: TorneioController
  let req: Request
  let res: Response

  beforeEach(() => {
    torneiocontroller = new TorneioController()
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response
  })

  describe('create', () => {
    it('should return 400 if tournament already exists', async () => {
      await torneiocontroller.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Torneio Existente')
    })

    it('should return 400 if tournament is invalid', async () => {
      req.body = { fileContents: 'invalid tournament' }

      await torneiocontroller.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Torneio Inválido')
    })
  })
})