import { Request, Response } from 'express'
import { VencedorTorneioController } from './VencedorTorneioController'
import { prismaMock } from '../../../singleton'
import { IVencedorTorneioDataProps } from '../../types/types'
import { EnumVencedorPosicao } from '../../types/types'
import { ParticipantesController } from '../Participantes/ParticipantesController'

describe('Testes unitários para Controle de Dados na Tabela VencedorTorneio', () => {
    let vencedorTorneioController: VencedorTorneioController
    let req: Request
    let res: Response

    beforeEach(() => {
        vencedorTorneioController = new VencedorTorneioController()
        req = {} as Request
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        } as unknown as Response
    })

    describe('createVariosVencedores', () => {

        it('should create multiple winners', async () => {
            const winners: IVencedorTorneioDataProps[] = [
                { participanteID: '1', torneioID: '1', posicao: EnumVencedorPosicao.PRIMEIRO },
                { participanteID: '2', torneioID: '1', posicao: EnumVencedorPosicao.SEGUNDO },
            ];

            const result = await VencedorTorneioController.createVariosVencedores(winners);
            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            if (result) {
                expect(result.count).toEqual(winners.length);
        });

    })

    describe('getVencedoresByTorneioID', () => {

        it('should get winners by tournament ID', async () => {
            const torneioID = '1';
            const result = await vencedorTorneioController.getVencedoresByTorneioID(torneioID);
            expect(result!).toBeDefined();
            expect(result!.length).toBeGreaterThan(0);
        });

    })

})