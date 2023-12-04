import express from 'express'
import { PrismaClient } from '@prisma/client'
import { routes } from './routes'
import 'dotenv/config'
import cors from 'cors'

const prisma = new PrismaClient()

const startServer = async () => {
  const app = express()

  app.use(cors()) // Isso habilita o CORS para todas as rotas

  app.use(express.json())

  app.use(routes)

  app.listen(process.env.PORT ? Number(process.env.PORT): 3000, () => {
    console.log(`HTTP Server Running in PORT:${process.env.PORT ? Number(process.env.PORT): 3000}`)
  })
}

startServer()
  .catch((error) => console.log(error))
  .finally(async () => {
    await prisma.$disconnect()
  })
