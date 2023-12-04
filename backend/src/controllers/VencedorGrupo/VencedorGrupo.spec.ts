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


            const vencedorGrupo = await vencedorGrupoController.create(vencedorGrupoData);

            expect(vencedorGrupo).toBeNull();

        });
    });


    it('should return "createdParticipantes" if create was a success', async () => {

        const createdVencedorGrupo: IVencedorGrupoDataProps = {
            participanteID: '1',
            grupoID: '1',
            posicao: EnumVencedorPosicao.PRIMEIRO,
        };


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
            id: '1',
            participanteID: '1',
            grupoID: '1',
            posicao: EnumVencedorPosicao.PRIMEIRO,
        })


        const newVencedorGrupo = await vencedorGrupoController.create(createdVencedorGrupo);

        expect(newVencedorGrupo).toHaveBeenCalledWith({
            data: {

                participanteID: '1',
                grupoID: '1',
                posicao: EnumVencedorPosicao.PRIMEIRO,


            }
        })



        describe('createVariosVencedores', () => {

            it('should return null if "data" is invalid', async () => {

                const vencedorGrupoData: IVencedorGrupoDataProps[] = [
                    {
                        participanteID: '',
                        grupoID: '',
                        posicao: EnumVencedorPosicao.PRIMEIRO,
                    }
                ]


                const vencedorGrupo = await vencedorGrupoController.createVariosVencedores(vencedorGrupoData);

                expect(vencedorGrupo).toBeNull();

            });




            it('should return "createdVencendores" if create was a success', async () => {

                const createdVariosVencedores: IVencedorGrupoDataProps[] = [{
                    participanteID: '1',
                    grupoID: '1',
                    posicao: EnumVencedorPosicao.PRIMEIRO,
                },
                {
                    participanteID: '1',
                    grupoID: '1',
                    posicao: EnumVencedorPosicao.PRIMEIRO,
                }]

                jest.spyOn(prismaMock.participante, 'findUnique').mockResolvedValue({
                    id: '1',
                    teamName: '1',
                    inGameName: '1',
                    checkedInAt: '1',
                    discordID: '1',
                    email: '1',
                });

                jest.spyOn(prismaMock.vencedorGrupo, 'findMany').mockResolvedValueOnce([
                    {
                        id: '1',
                        participanteID: '1',
                        grupoID: '1',
                        posicao: EnumVencedorPosicao.PRIMEIRO,
                    }
                ]);

                jest.spyOn(prismaMock.grupo, 'createMany').mockResolvedValueOnce({
                    data: [{
                        id: '1',
                        rodadaID: '1',
                    }]
                } as any);

                const newVencedoresGrupo = await vencedorGrupoController.createVariosVencedores(createdVariosVencedores);

                expect(newVencedorGrupo).toHaveBeenCalledWith({
                    data: {
                        participanteID: '1',
                        grupoID: '1',
                        posicao: EnumVencedorPosicao.PRIMEIRO,
                    }
                })

            })

        describe('getVencedoresByGrupoID', () => {



            it('should return null if "searchByGrupoID" returns null', async () => {



                jest.spyOn(prismaMock.grupo, 'findUnique').mockResolvedValue({

                    id: '1',
                    rodadaID: '1',

                })


                const searchVencedores = await vencedorGrupoController.getVencedoresByGrupoID('5')

                    expect(searchVencedores).toBeNull()
                }) // Increase the timeout value to 10 seconds



            it('should return "grupos" if "findMany" returns true', async () => {

                jest.spyOn(prismaMock.grupo, 'findUnique').mockResolvedValue({

                    id: '1',
                    rodadaID: '1',

                })


                const searchVencedores = await vencedorGrupoController.getVencedoresByGrupoID('1')

                expect(searchVencedores).toBeNull()
            })



                /*it('should return "grupos" if "findMany" returns true', async () => {
                    const newParticipantetres: GrupoProps[] = [{
                        grupoID: '1'
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
                    })*/
            })

        })
    });

})