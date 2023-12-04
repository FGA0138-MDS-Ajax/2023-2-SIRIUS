import { Request, Response } from 'express'
import { ParticipanteEmGrupoController } from './ParticipanteEmGrupoController'
import { prismaMock } from '../../../singleton'
import { IPlayerEmGrupoDataProps } from '../../types/types'
import { ParticipantesController } from '../Participantes/ParticipantesController'

describe('Testes unitários para Controle de Dados na Tabela ParticipanteEmGrupoController', () => {
    let participanteEmGrupoController: ParticipanteEmGrupoController
    let req: Request
    let res: Response

    beforeEach(() => {
        participanteEmGrupoController = new ParticipanteEmGrupoController()
        req = {} as Request
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        } as unknown as Response
    })

    describe('create', () => {

        it('should return null if "data" is invalid', async () => {
            const createdParticipantes: IPlayerEmGrupoDataProps[] = []

            const newcreateParticipantes = await participanteEmGrupoController.create(createdParticipantes)

            expect(newcreateParticipantes).toEqual(null)
        })

        it('should return "createdParticipantes" if create was a success', async () => {

            const participantesEmGrupoData: IPlayerEmGrupoDataProps[] = [
                {
                    participanteID: '1',
                    torneioID: '1',
                    grupoID: '1',
                },
                {
                    participanteID: '2',
                    torneioID: '2',
                    grupoID: '2',
                },
            ]

            jest.spyOn(prismaMock.participanteEmGrupo, 'createMany').mockResolvedValueOnce({
                count: 2,
            })

            const createdParticipantes = await participanteEmGrupoController.create(participantesEmGrupoData);

            expect(createdParticipantes).toEqual({ "count": 2 });

        })
    })

    describe('searchGruposDeParticipante', () => {


        it('should return null if "participantesEmGrupoData" is invalid', async () => {
            const newParticipanteEmGrupo: IPlayerEmGrupoDataProps[] = [{
                torneioID: '',
                participanteID: '',
                grupoID: '',
            }]

            const participantegrupo = await participanteEmGrupoController.searchGruposDeParticipante(newParticipanteEmGrupo)

            expect(participantegrupo).toBeNull()
        })

        it('should return null if "serachByName" returns null', async () => {
            const newParticipanteEmGrupo: IPlayerEmGrupoDataProps[] = [{
                torneioID: '1',
                participanteID: '1',
                grupoID: '1',
            }]

            jest.spyOn(prismaMock.torneio, 'findUnique').mockResolvedValueOnce(null)

            const participantegrupo = await participanteEmGrupoController.searchGruposDeParticipante(newParticipanteEmGrupo)

            expect(participantegrupo).toBeNull()
        })

        it('should return null if "serachByInGameName" returns null', async () => {
            const newParticipanteEmGrupo: IPlayerEmGrupoDataProps[] = [{
                torneioID: '2',
                participanteID: '2',
                grupoID: '2',
            }]

            jest.spyOn(prismaMock.torneio, 'findUnique').mockResolvedValueOnce({
                id: '2',
                nome: 'Teste'
            })

            jest.spyOn(prismaMock.participante, 'findMany').mockResolvedValueOnce([])

            const participantegrupo = await participanteEmGrupoController.searchGruposDeParticipante(newParticipanteEmGrupo)

            expect(participantegrupo).toBeNull()
        }, 10000) // Increase the timeout value to 10 seconds

        it('should return "grupos" if "findMany" returns true', async () => {
            const newParticipanteEmGrupo: IPlayerEmGrupoDataProps[] = [{
                torneioID: '3',
                participanteID: '3',
                grupoID: '3',
            }]

            jest.spyOn(prismaMock.torneio, 'findUnique').mockResolvedValueOnce({
                id: '3',
                nome: '3',
            })

            jest.spyOn(prismaMock.participante, 'findUnique').mockResolvedValueOnce({
                id: '3',
                teamName: '3',
                inGameName: '3',
                checkedInAt: '',
                discordID: '3',
                email: 'Teste',
            })

            jest.spyOn(prismaMock.participanteEmGrupo, 'findMany').mockResolvedValueOnce([{
                id: '3',
                participanteID: '3',
                grupoID: '3',
                torneioID: '3',
            }])

            const participantegrupo = await participanteEmGrupoController.searchGruposDeParticipante(newParticipanteEmGrupo)

            expect(participantegrupo).toEqual([{
                id: '3',
                torneioID: '3',
                participanteID: '3',
                grupoID: '3',
            }])
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
            jest.spyOn(prismaMock.participanteEmGrupo, 'findMany').mockResolvedValueOnce([{
                id: '1',
                torneioID: '1',
                participanteID: '1',
                grupoID: '1',
            }])

            await participanteEmGrupoController.getParticipantesEmGrupo(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith([{
                id: '1',
                torneioID: '1',
                participanteID: '1',
                grupoID: '1',
            }])
        })

    })

})
