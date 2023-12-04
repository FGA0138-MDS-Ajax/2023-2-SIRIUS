import { Request, Response } from 'express'
import { VencedorGrupoController } from './VencedorGrupoController'
import { prismaMock } from '../../../singleton'
import { ParticipantesController } from '../Participantes/ParticipantesController'
import { IVencedorGrupoDataProps } from '../../types/types'
import { GrupoController } from '../Grupos/GrupoController'



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
            const createdParticipantes: IVencedorGrupoDataProps[] = []

            const newcreateParticipantes = await vencedorGrupoController.create(createdParticipantes)

            expect(newcreateParticipantes).toEqual(null)
        })

    })






















})