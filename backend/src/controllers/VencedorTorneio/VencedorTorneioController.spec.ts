import { Request, Response } from 'express'
import { VencedorTorneioController } from './VencedorTorneioController'
import { prismaMock } from '../../../singleton'
import { IVencedorTorneioDataProps } from '../../types/types'
import { EnumVencedorPosicao } from '../../types/types'

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

        it('should return null if "dadosVencedores" is invalid', async () => {
            const createdVencedores: IVencedorTorneioDataProps[] = []

            const newcreateVencedores = await vencedorTorneioController.createVariosVencedores(createdVencedores)

            expect(newcreateVencedores).toBeNull()
        })

        it('should return "createdVencedores" if create was a success', async () => {

            const dadosVencedores: IVencedorTorneioDataProps[] = [
                {
                    participanteID: '1',
                    torneioID: '1',
                    posicao: EnumVencedorPosicao.PRIMEIRO,
                },
                {
                    participanteID: '2',
                    torneioID: '2',
                    posicao: EnumVencedorPosicao.SEGUNDO,
                },
                {
                    participanteID: '3',
                    torneioID: '3',
                    posicao: EnumVencedorPosicao.TERCEIRO,
                },
                {
                    participanteID: '4',
                    torneioID: '4',
                    posicao: EnumVencedorPosicao.QUARTO,
                },
            ]

            jest.spyOn(prismaMock.vencedorTorneio, 'createMany').mockResolvedValueOnce({
                count: 4,
            })

            const createdVencedores = await vencedorTorneioController.createVariosVencedores(dadosVencedores);

            expect(createdVencedores).toEqual({ "count": 4 });


        })
    })

    describe('getVencedoresByTorneioID', () => {

        it('should return null if "torneioID" is invalid', async () => {
            const torneioID = '1'

            const newgetVencedoresByTorneioID = await vencedorTorneioController.getVencedoresByTorneioID(torneioID)

            expect(newgetVencedoresByTorneioID).toEqual(null)
        })

        it('should return "vencedores" if get was a success', async () => {

            const torneioID = '1'

            const dadosVencedores: IVencedorTorneioDataProps[] = [
                {
                    participanteID: '1',
                    torneioID: '1',
                    posicao: EnumVencedorPosicao.PRIMEIRO,
                },
                {
                    participanteID: '2',
                    torneioID: '1',
                    posicao: EnumVencedorPosicao.SEGUNDO,
                },
                {
                    participanteID: '3',
                    torneioID: '1',
                    posicao: EnumVencedorPosicao.TERCEIRO,
                },
                {
                    participanteID: '4',
                    torneioID: '1',
                    posicao: EnumVencedorPosicao.QUARTO,
                },
            ]

            it('should return "vencedores" if get was a success', async () => {
                const torneioID = '1';

                const dadosVencedores: IVencedorTorneioDataProps[] = [
                    {
                        participanteID: '1',
                        torneioID: '1',
                        posicao: EnumVencedorPosicao.PRIMEIRO,
                    },
                    {
                        participanteID: '2',
                        torneioID: '1',
                        posicao: EnumVencedorPosicao.SEGUNDO,
                    },
                    {
                        participanteID: '3',
                        torneioID: '1',
                        posicao: EnumVencedorPosicao.TERCEIRO,
                    },
                    {
                        participanteID: '4',
                        torneioID: '1',
                        posicao: EnumVencedorPosicao.QUARTO,
                    },
                ];

                jest.spyOn(prismaMock.vencedorTorneio, 'findMany').mockResolvedValueOnce(dadosVencedores.map(vencedor => ({ ...vencedor, id: '1' })));

                const vencedores = await vencedorTorneioController.getVencedoresByTorneioID(torneioID);

                expect(vencedores).toEqual(dadosVencedores);

            })

        })

    })
})