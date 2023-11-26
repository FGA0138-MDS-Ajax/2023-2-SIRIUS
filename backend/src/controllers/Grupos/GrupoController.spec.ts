import { Request, Response } from 'express'
import { beforeEach } from 'node:test'
import { GrupoController } from './GrupoController'

describe('Testes unitários para Controle de  Dados na Tabela Grupos', () => {
  let grupocontroller: GrupoController
  let req: Request
  let res: Response

  beforeEach(() => {
    grupocontroller = new GrupoController()
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response
  })

  describe('create', () => {
    it('should return 400 if group already exists', async () => {
      await grupocontroller.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Grupo Existente')
    })

    it('should return 400 if group is invalid', async () => {
      req.body = { fileContents: 'invalid group' }

      await grupocontroller.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Grupo Inválido')
    })
  })
})