import { Request, Response } from 'express'
import { GrupoController } from './GrupoController'
import { prismaMock } from './../../mocks/prismaMock'

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
    it('should return 400 if group already exists', async () => {
      // Mock do método findUnique do Prisma
      jest.spyOn(prismaMock.grupos, 'findUnique').mockResolvedValueOnce({ 
        id: 1,
        nome: 'GrupoA',
        descricao: 'GrupoA',
        published: true,
      })

      await grupoController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Grupo Existente')
    })

    it('should return 400 if group is invalid', async () => {
      req.body = { /* Dados do grupo inválido */ }

      await grupoController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Grupo Inválido')
    })
  })
})
