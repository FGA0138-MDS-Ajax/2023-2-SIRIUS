import { Request, Response } from 'express'
import { CSVController } from './CSVController'

describe('Testes unitários para o CSV Controller', () => {
  let csvController: CSVController
  let req: Request
  let res: Response

  beforeEach(() => {
    csvController = new CSVController()
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response
  })

  describe('importCSV', () => {

    it('should return 400 if fileContents is not provided', async () => {
      req.body = { fileContents: '' }
      await csvController.importCSV(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('CSV Vazio')
    })

    it('should return 400 if csvContents is invalid', async () => {
      req.body = { fileContents: 1 }

      await csvController.importCSV(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('CSV Inválido')
    })

    it('should return JSON data if csvContents is valid', async () => {
      req.body = { fileContents: 'valid csv' }

      const expectedJSON = [
        { key1: 'value1', key2: 'value2' },
        { key1: 'value3', key2: 'value4' },
        // Adicione mais objetos conforme necessário
      ]

      jest.spyOn(csvController, 'parseCSV').mockReturnValue(['valid csv'])
      jest.spyOn(csvController, 'extractKeys').mockReturnValue(['key1', 'key2'])
      jest.spyOn(csvController, 'generateJSONData').mockReturnValue(expectedJSON)

      await csvController.importCSV(req, res)

      expect(res.json).toHaveBeenCalledWith(expectedJSON)
    })

    it('should return 500 if an error occurs', async () => {
      req.body = { fileContents: 'valid csv' }
      jest.spyOn(csvController, 'parseCSV').mockImplementation(() => {
        throw new Error('parse error')
      })

      await csvController.importCSV(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.send).toHaveBeenCalledWith('Erro no Processamento do CSV')
    })
  })
})