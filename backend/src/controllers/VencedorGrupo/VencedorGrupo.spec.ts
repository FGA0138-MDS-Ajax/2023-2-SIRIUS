import { Request, Response } from 'express'
import { VencedorGrupoController } from './VencedorGrupoController'
import { prismaMock } from '../../../singleton'
import { ParticipantesController } from '../Participantes/ParticipantesController'
import { IVencedorGrupoDataProps } from '../../types/types'
import { GrupoController } from '../Grupos/GrupoController'
import { GrupoProps } from '../../types/types'
import { EnumVencedorPosicao } from '../../types/types';


describe('Testes unitários para Controle de Dados na Tabela VencedorGrupoController', () => {
    let vencedorGrupoController: VencedorGrupoController
    let req: Request
    let res: Response

    beforeEach(() => {
        vencedorGrupoController = new VencedorGrupoController()
        req = {} as Request
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        } as unknown as Response
    })

    describe('create', () => {

        it('should return null if "data" is invalid', async () => {

            const vencedorGrupoData: IVencedorGrupoDataProps = {
                participanteID: '',
                grupoID: '',
                posicao: EnumVencedorPosicao.PRIMEIRO,
            };

            /*
            jest.spyOn(prismaMock.grupo, 'findUnique').mockResolvedValueOnce({
                id: 'groupId',
                rodadaID: 'rodadaId',
            });

            jest.spyOn(prismaMock.participante, 'findUnique').mockResolvedValueOnce({
                id: 'participantId',
                teamName: 'teamName',
                inGameName: 'inGameName',
                checkedInAt: 'checkedInAt',
                discordID: 'discordId',
                email: 'email',
            });
            */
            const vencedorGrupo = await vencedorGrupoController.create(vencedorGrupoData);

            expect(vencedorGrupo).toBeNull();
            /*
            expect(prismaMock.grupo.findUnique).toHaveBeenCalledWith({ id: 'groupId', rodadaID: 'rodadaId' });
            expect(prismaMock.participante.findUnique).toHaveBeenCalledWith({ id: 'participantId', teamName: 'teamName', inGameName: 'inGameName', checkedInAt: 'checkedInAt', discordID: 'discordId', email: 'email' });
            */
        });
    });


    it('should return "createdParticipantes" if create was a success', async () => {

        const createdVencedorTorneio: IVencedorGrupoDataProps[] = [
            {
                participanteID: '1',
                grupoID: '1',
                posicao: EnumVencedorPosicao.PRIMEIRO,
            }
        ]


        jest.spyOn(prismaMock.grupo, 'findUnique').mockResolvedValueOnce({
            id: '1',
            rodadaID: '1',
        });

        jest.spyOn(prismaMock.participante, 'findUnique').mockResolvedValueOnce({
            id: '1',
            teamName: '1',
            inGameName: '1',
            checkedInAt: '1',
            discordID: '1',
            email: '1',
        });

        jest.spyOn(prismaMock.vencedorGrupo, 'create').mockResolvedValueOnce({
            participanteID: '1',
            grupoID: '1',
            posicao: EnumVencedorPosicao.PRIMEIRO,
        })

        await vencedorGrupoController.create(newRodada)

        expect(prismaMock.rodada.create).toHaveBeenCalledWith({
            data: { torneioID: newRodada },

            const createdParticipantes = await participanteEmGrupoController.create(participantesEmGrupoData);

            expect(createdParticipantes).toEqual({ "count": 2 });

        })
    })




















})