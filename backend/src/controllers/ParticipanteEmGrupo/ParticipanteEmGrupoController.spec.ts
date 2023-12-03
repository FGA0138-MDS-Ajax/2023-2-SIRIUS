import { Request, Response } from 'express'
import { ParticipanteEmGrupoController } from './ParticipanteEmGrupoController'
import { prismaMock } from '../../../singleton'
import { IPlayerEmGrupoDataProps } from '../../types/types'

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

            jest.spyOn(prismaMock.grupo, 'create').mockResolvedValueOnce({
                id: '1',
                rodadaID: '1',
            })

            jest.spyOn(prismaMock.participante, 'create').mockResolvedValueOnce({
                id: '1',
                teamName: '1',
                inGameName: '1',
                checkedInAt: '1',
                discordID: '1',
                email: '1',
            })

            jest.spyOn(prismaMock.participanteEmGrupo, 'create').mockResolvedValueOnce({
                id: '1',
                participanteID: '1',
                grupoID: '1',
                torneioID: '1',
            })

            const createdParticipantes = await participanteEmGrupoController.create(participantesEmGrupoData)

            expect(createdParticipantes).toEqual(participantesEmGrupoData)
        })

    })

    describe('searchGruposDeParticipante', () => {


        it('should return null if "participantesEmGrupoData" is invalid', async () => {
            const newParticipanteEmGrupo: IPlayerEmGrupoDataProps[] = []

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
                torneioID: '1',
                participanteID: '1',
                grupoID: '1',
            }]

            jest.spyOn(prismaMock.torneio, 'findUnique').mockResolvedValueOnce({
                id: '1',
                nome: 'Teste'
            })

            jest.spyOn(prismaMock.participante, 'findUnique').mockResolvedValueOnce(null)

            const participantegrupo = await participanteEmGrupoController.searchGruposDeParticipante(newParticipanteEmGrupo)

            expect(participantegrupo).toBeNull()
        })

        it('should return "grupos" if "findMany" returns true', async () => {
            const newParticipanteEmGrupo: IPlayerEmGrupoDataProps[] = [{
                torneioID: '1',
                participanteID: '1',
                grupoID: '1',
            }]

            jest.spyOn(prismaMock.torneio, 'findUnique').mockResolvedValueOnce({
                id: '1',
                nome: 'Teste',
            })

            jest.spyOn(prismaMock.participante, 'findUnique').mockResolvedValueOnce({
                id: '1',
                teamName: 'Teste',
                inGameName: 'Teste',
                checkedInAt: '',
                discordID: '1',
                email: 'Teste',
            })

            jest.spyOn(prismaMock.participanteEmGrupo, 'findMany').mockResolvedValueOnce([{
                id: '1',
                participanteID: '1',
                grupoID: '1',
                torneioID: '1',
            }])

            const participantegrupo = await participanteEmGrupoController.searchGruposDeParticipante(newParticipanteEmGrupo)

            expect(participantegrupo).toEqual({
                id: '1',
                torneioID: '1',
                participanteID: '1',
                grupoID: '1',
            })
        })

    })

    describe('getParticipantesEmGrupo', () => {

        it('should return 400 if "findMany" returns false', async () => {
            jest.spyOn(prismaMock.participanteEmGrupo, 'findMany').mockResolvedValueOnce([])

            await participanteEmGrupoController.getParticipantesEmGrupo(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.send).toHaveBeenCalledWith('Nenhum participante encontrado!')
        })

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
