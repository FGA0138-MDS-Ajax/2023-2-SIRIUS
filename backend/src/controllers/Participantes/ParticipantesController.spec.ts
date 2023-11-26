import { Request, Response } from 'express'
import { beforeEach } from 'node:test'
import { ParticipantesController } from './ParticipantesController'

describe('Testes unitários para Controle de  Dados na Tabela Participantes', () => {
  let participantesController: ParticipantesController
  let req: Request
  let res: Response 
  
  beforeEach(() => {
    participantesController = new ParticipantesController()
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response
  })

  describe('create', () => {
    it('should return 400 if fileContents already exists', async () => {
      await participantesController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Participante já Existente')
    })

    it('should return 400 if participant is invalid', async () => {
      req.body = { fileContents: 'invalid participant' }

      await participantesController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Participante Inválido')
    })

  
    /*
    it('Deve criar um novo participante', async () => {
      // Configurar dados de teste
      const dadosDeTeste = {
        id: 1,
        teamname: 'Jogador1',
        ingamename: 'Jogador1',
        checkedinat: new Date(),
        iddiscord: '123456',
        published: true,
        emailcon: 'jogador1@example.com',
        grupo: 'GrupoA',
        grupoId: 123,
      }
     
      const newParticipante = await createParticipante(dadosDeTeste);
    

    // Verificar se o participante foi criado corretamente
      const expectedJSON = [ 
        {expect(newParticipante).toHaveProperty('id')},
        {expect(newParticipante.teamname).toBe('Jogador1')},
        {expect(newParticipante.ingamename).toBe('Jogador1')},
        {expect(newParticipante.checkedinat).toBe('new Date()')},
        {expect(newParticipante.iddiscord).toBe('123456')},
        {expect(newParticipante.published).toBe('true')},
        {expect(newParticipante.emailcom).toBe('jogador1@example.com')},
        {expect(newParticipante.grupo).toBe('GrupoA')},
        {expect(newParticipante.grupoId).toBe('123')},
      ]

      jest.spyOn(participantesController , 'create').mockReturnValue(['valid csv'])

    })

    // Executar a função e aguardar a promessa
    

    
    // Continue adicionando verificações conforme necessário

    // Limpar dados de teste (opcional)
    /*
    await prisma.participantes.delete({
      where: {
        id: novoParticipante.id,
      },
    })
    */
  })
})