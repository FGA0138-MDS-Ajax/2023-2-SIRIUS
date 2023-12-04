import { Request, Response } from 'express'
import { TorneioController } from './TorneioController'
import { prismaMock } from '../../../singleton'
import { EnumRodada, IPlayerDataProps, IPlayerEmGrupoDataProps } from '../../types/types'
import { RodadaController } from '../Rodadas/RodadaController'
import { GrupoController } from '../Grupos/GrupoController'
import { ParticipantesController } from '../Participantes/ParticipantesController'
import { ParticipanteEmGrupoController } from '../ParticipanteEmGrupo/ParticipanteEmGrupoController'

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

    //Validar no Controller se o nome é invalido
    it('should return null if "nome" is invalid', async () => {
      const nome = ''

      const torneio = await torneioController.create(nome, [])

      expect(torneio).toBeNull()
    })

    it('should return null if "create" returns false', async () => {
      const nome = 'Teste'

      jest.spyOn(prismaMock.torneio, 'create').mockResolvedValueOnce({
        id: '',
        nome: ''
      })

      const torneio = await torneioController.create(nome, [])

      expect(torneio).toBeNull()
      expect(prismaMock.torneio.create).toHaveBeenCalledWith({ data: { nome } })
    })



    it('should return "torneio" if "create" returns true', async () => {
      const nome = 'Teste'
      const rodada = {
        data: {
          numeroRodada: 'UM',
          torneioID: '1',
        }
      }
      const grupo =
      {
        data: {
          rodadaID: '1'
        },
      }
      {
        data: {
          rodadaID: '1'
        }
      }

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

        ],
        "skipDuplicates": true
      };

      const participanteemgrupo =
      {
        data:
          [
            {
              grupoID: '1',
              numeroRodada: 'UM',
              participanteID: 'string',
              torneioID: '1',
            }
          ],
        skipDuplicates: true
      }



      const playertorneio: Array<IPlayerDataProps[]> = [
        [
          {
            teamName: 'string',
            inGameName: 'string',
            checkedInAt: 'string',
            id: 'string',
            discordID: 'string',
            email: 'string',
          },
        ],
        [
          {
            teamName: 'string2',
            inGameName: 'string2',
            checkedInAt: 'string2',
            id: 'string2',
            discordID: 'string2',
            email: 'string2',
          },
        ],
      ];
      [
        {
          teamName: 'string3',
          inGameName: 'string3',
          checkedInAt: 'string3',
          id: 'string3',
          discordID: 'string3',
          email: 'string3',
        },
        {
          teamName: 'string4',
          inGameName: 'string5',
          checkedInAt: 'string6',
          id: 'string7',
          discordID: 'string8',
          email: 'string9',
        },
      ]

      jest.spyOn(prismaMock.torneio, 'create').mockResolvedValueOnce({
        id: '1',
        nome: 'nome'
      })

      jest.spyOn(prismaMock.rodada, 'create').mockResolvedValueOnce({
        id: '1',
        torneioID: 'nome',
        numeroRodada: EnumRodada.UM
      })

      jest.spyOn(prismaMock.grupo, 'create').mockResolvedValue({
        id: '1',
        rodadaID: 'nome'
      })

      jest.spyOn(prismaMock.participante, 'createMany').mockResolvedValue({
        count: 2,
      })

      jest.spyOn(prismaMock.participanteEmGrupo, 'createMany').mockResolvedValue({
        count: 2,
      })

      const torneio = await torneioController.create(nome, playertorneio)

      expect(torneio).not.toBeNull()
      expect(prismaMock.torneio.create).toHaveBeenCalledWith({ data: { nome } })
      expect(prismaMock.rodada.create).toHaveBeenCalledWith(rodada)
      expect(prismaMock.grupo.create).toHaveBeenCalledWith(grupo)
      expect(prismaMock.participante.createMany).toHaveBeenCalledWith(participantetorneio)
      expect(prismaMock.participanteEmGrupo.createMany).toHaveBeenCalledWith(participanteemgrupo)
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
