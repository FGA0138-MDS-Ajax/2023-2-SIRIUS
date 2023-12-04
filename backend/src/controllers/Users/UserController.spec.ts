import { Request, Response } from 'express'
import { prismaMock } from '../../../singleton'
import { IUserDataProps } from '../../types/types'
import { UserController } from './UsersController'

describe('Testes unitários para Controle de Dados na Tabela ParticipanteEmGrupoController', () => {
    let userController: UserController
    let req: Request
    let res: Response

    beforeEach(() => {
        userController = new UserController()
        req = {} as Request
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        } as unknown as Response
    })

    describe('create', () => {

        it('should return null if "data" is invalid', async () => {
            const createdUsers: IUserDataProps[] =
                [
                    {
                        name: '1',
                        email: '1',
                        password: '1',
                    },
                    {
                        name: '2',
                        email: '2',
                        password: '2',
                    },
                ]

            const newcreateUsers = await userController.create(createdUsers[0]);

            expect(newcreateUsers).toEqual({ "token": null, "user": {} });
        })

        it('should return "createdUsers" if create was a success', async () => {

            const usersData: IUserDataProps[] = [
                {
                    name: '1',
                    email: '1',
                    password: '1',
                },
                {
                    name: '2',
                    email: '2',
                    password: '2',
                },
            ]

            jest.spyOn(prismaMock.user, 'createMany').mockResolvedValueOnce({
                count: 2,
            })

            const createdUsers = await userController.create(usersData[0]);

            expect(createdUsers).toEqual({ "count": 2 });

        })
    })

    describe('login', () => {

        it('should return null if "data" is invalid', async () => {
            const createdUsers: IUserDataProps[] = []

            const newcreateUsers = await userController.login(createdUsers[0])

            expect(newcreateUsers).toEqual(null)
        })

        it('should return "createdUsers" if create was a success', async () => {

            const usersData: IUserDataProps[] = [
                {
                    name: '1',
                    email: '1',
                    password: '1',
                },
                {
                    name: '2',
                    email: '2',
                    password: '2',
                },
            ]

            jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValueOnce({
                id: 1,
                name: '1',
                email: '1',
                password: '1',
            })

            const createdUsers = await userController.login(usersData[0]);

            expect(createdUsers).toEqual({ "id": "1", "email": "1", "password": "1" });

        })
    })

    describe('getProfile', () => {

        it('should return null if "data" is invalid', async () => {
            const createdUsers: IUserDataProps[] = []

            const newcreateUsers = await userController.getProfile(req, res)

            expect(newcreateUsers).toEqual(null)
        })

        it('should return "createdUsers" if create was a success', async () => {

            const usersData: IUserDataProps[] = [
                {
                    name: '1',
                    email: '1',
                    password: '1',
                },
                {
                    name: '2',
                    email: '2',
                    password: '2',
                },
            ]

            jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValueOnce({
                id: 1,
                name: '1',
                email: '1',
                password: '1',
            })

            const createdUsers = await userController.getProfile(req, res);

            expect(createdUsers).toEqual({ "id": "1", "email": "1", "password": "1" });

        })
    })
})
