import { Request, Response } from 'express'
import { beforeEach } from 'node:test'
import { RodadaController } from './Rodadacontroller'

describe('Testes unitários para Controle de Dados na Tabela Rodadas', () => {
  let rodadacontroller: RodadaController
  let req: Request
  let res: Response

  beforeEach(() => {
    rodadacontroller = new RodadaController()
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response
  })

  describe('create', () => {
    it('should return 400 if round already exists', async () => {
      await rodadacontroller.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Rodada Existente')
    })

    it('should return 400 if round is invalid', async () => {
      req.body = { fileContents: 'invalid round' }

      await rodadacontroller.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Rodada Inválida')
    })
  })
})