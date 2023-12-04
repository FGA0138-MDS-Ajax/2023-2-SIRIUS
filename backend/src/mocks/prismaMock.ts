import { PrismaClient } from '@prisma/client'

jest.mock('@prisma/client')

export const prismaMock = new PrismaClient() as jest.Mocked<PrismaClient>