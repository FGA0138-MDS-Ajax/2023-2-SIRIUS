import { Request, Response } from 'express'
import { ParticipantesController } from './ParticipantesController'
import { prismaMock } from '../../../singleton'
import { EnumRodada, EnumVencedorPosicao, IPlayerDataProps } from '../../types/types'


describe('Testes unitários para Controle de Dados na Tabela Participantes', () => {
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

    it('should return null if "data" is invalid', async () => {

      const createdparticipantesData: IPlayerDataProps[] = []

      jest.spyOn(prismaMock.participante, 'createMany').mockResolvedValueOnce({
        data: [{
          id: '1',
          teamName: '1',
          inGameName: '1',
          checkedInAt: '1',
          discordID: '1',
          email: '1',
        }]
      } as any);

      const newParticipantesData = await participantesController.create(createdparticipantesData)

      expect(newParticipantesData).toEqual(null)
    })

    it('should return "createdParticipantes" if create was a success', async () => {

      const participantetorneio =
      {
        data: [
          {
            checkedInAt: 'string',
            teamName: 'string',
            inGameName: 'string',
            id: 'string',
            discordID: 'string',
            email: 'string',
          },
          {
            checkedInAt: 'string1',
            teamName: 'string1',
            inGameName: 'string1',
            id: 'string1',
            discordID: 'string1',
            email: 'string1',
          },

        ],
        "skipDuplicates": true,
      };

      const createdparticipantesData: IPlayerDataProps[] = [
        {
          teamName: 'string',
          inGameName: 'string',
          checkedInAt: 'string',
          id: 'string',
          discordID: 'string',
          email: 'string',
        },
        {
          teamName: 'string1',
          inGameName: 'string1',
          checkedInAt: 'string1',
          id: 'string1',
          discordID: 'string1',
          email: 'string1',
        },
      ]

      jest.spyOn(prismaMock.participante, 'createMany').mockResolvedValueOnce(
        {
          count: 2
        });

      await participantesController.create(createdparticipantesData)

      expect(prismaMock.participante.createMany).toHaveBeenCalledWith({ data: createdparticipantesData, skipDuplicates: true })
    })

  })

  describe('searchByInGameName', () => {

    it('should return null if "searchByInGameName" returns null', async () => {
      const newParticipante: IPlayerDataProps[] = [{
        teamName: 'string',
        inGameName: 'string',
        checkedInAt: 'string',
        id: 'string',
        discordID: 'string',
        email: 'string',
      }]

      jest.spyOn(prismaMock.torneio, 'findUnique').mockResolvedValueOnce({
        id: '2',
        nome: 'Teste'
      })

      jest.spyOn(prismaMock.participante, 'findMany').mockResolvedValueOnce([])

      const participantedois = await participantesController.searchByInGameName('string')

      expect(participantedois).toBeNull()
    }, 10000) // Increase the timeout value to 10 seconds

    it('should return "grupos" if "findMany" returns true', async () => {
      const newParticipantetres: IPlayerDataProps[] = [{
        teamName: '3',
        inGameName: '3',
        checkedInAt: '3',
        id: '3',
        discordID: '3',
        email: 'Teste',
      }]

      jest.spyOn(prismaMock.participante, 'findUnique').mockResolvedValueOnce({
        id: '3',
        teamName: '3',
        inGameName: '3',
        checkedInAt: '',
        discordID: '3',
        email: 'Teste',
      })

      const participantequatro = await participantesController.searchByInGameName('3')

      expect(participantequatro).toEqual({
        id: '3',
        teamName: '3',
        inGameName: '3',
        checkedInAt: '',
        discordID: '3',
        email: 'Teste',
      })
    })

  })

  describe('getParticipantesEmGrupo', () => {

    /* Função Buscando sem parâmetros
    it('should return 400 if "findMany" returns false', async () => {
        jest.spyOn(prismaMock.participanteEmGrupo, 'findMany').mockResolvedValueOnce([])
   
        await participanteEmGrupoController.getParticipantesEmGrupo(req, res)
   
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith('Nenhum participante encontrado!')
    })
    */

    it('should return 200 if "findMany" returns true', async () => {
      jest.spyOn(prismaMock.participante, 'findMany').mockResolvedValueOnce([{
        id: '1',
        teamName: '1',
        inGameName: '1',
        checkedInAt: '1',
        discordID: '1',
        email: '1',
      }])

      await participantesController.getParticipantes(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
    })

  })

  describe('searchByID', () => {

    it('should return null if "searchByID" returns null', async () => {
      const newParticipante: IPlayerDataProps[] = [{
        teamName: 'string',
        inGameName: 'string',
        checkedInAt: 'string',
        id: 'string',
        discordID: 'string',
        email: 'string',
      }]

      jest.spyOn(prismaMock.participante, 'findUnique').mockResolvedValueOnce(null)

      const participante = await participantesController.searchByID('string')

      expect(participante).toBeNull()
    })

    it('should return "participante" if "findUnique" returns true', async () => {
      const newParticipante: IPlayerDataProps[] = [{
        teamName: 'string',
        inGameName: 'string',
        checkedInAt: 'string',
        id: 'string',
        discordID: 'string',
        email: 'string',
      }]

      jest.spyOn(prismaMock.participante, 'findUnique').mockResolvedValueOnce({
        id: '1',
        teamName: '1',
        inGameName: '1',
        checkedInAt: '1',
        discordID: '1',
        email: '1',
      })

      const participante = await participantesController.searchByID('1')

      expect(participante).toEqual({
        id: '1',
        teamName: '1',
        inGameName: '1',
        checkedInAt: '1',
        discordID: '1',
        email: '1',
      })
    })

  })

})



