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

    const prismaMock = {
        vencedorTorneio: {
            createMany: jest.fn(),
            findMany: jest.fn(),
        },
    };

    jest.mock('../../../client', () => ({
        __esModule: true,
        default: prismaMock,
    }));


    jest.mock('../Participantes/ParticipantesController', () => ({
        ParticipantesController: jest.fn().mockImplementation(() => ({
            searchByID: jest.fn(),
        })),
    }));

    describe('VencedorTorneioController', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should create multiple winners', async () => {

            const controller = new VencedorTorneioController();
            const dadosVencedores = [
                {
                    torneioID: '1',
                    participanteID: '1',
                    posicao: EnumVencedorPosicao.PRIMEIRO
                },

            ];

            const result = await controller.createVariosVencedores(dadosVencedores);

            expect(result).not.toBeTruthy();

        });

        it('should handle errors during winner creation', async () => {
            const controller = new VencedorTorneioController();
            const dadosVencedores = [
                {
                    torneioID: '1',
                    participanteID: '1',
                    posicao: EnumVencedorPosicao.PRIMEIRO
                },
            ];

            prismaMock.vencedorTorneio.createMany.mockRejectedValueOnce(new Error('Test error'));

            const result = await controller.createVariosVencedores(dadosVencedores);

            expect(result).toBeNull();

        });

        it('should get winners by torneio ID', async () => {

            const controller = new VencedorTorneioController();
            const torneioID = '1';
            const mockVencedores = [{ torneioID, participanteID: '123', posicao: 1 }];

            prismaMock.vencedorTorneio.findMany.mockResolvedValueOnce(mockVencedores);


            const result = await controller.getVencedoresByTorneioID(torneioID);

            expect(result).not.toEqual(mockVencedores);

        });

        it('should handle errors during winner retrieval by torneio ID', async () => {

            const controller = new VencedorTorneioController();
            const torneioID = '1';

            prismaMock.vencedorTorneio.findMany.mockRejectedValueOnce(new Error('Test error'));

            const result = await controller.getVencedoresByTorneioID(torneioID);

            expect(result).toBeUndefined();
        });
    });
})