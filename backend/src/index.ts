import { z } from 'zod'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { routes } from './routes'

const prisma = new PrismaClient()

const userSchema = z.object({
  name: z.string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .transform(name => name.toLocaleUpperCase()),
  age: z.number().min(18, { message: 'You must be at least 18 years old' })
})

type User = z.infer<typeof userSchema>

function saveUserToDatabase(user: User) {
  const { name, age } = userSchema.parse(user)

  console.log(`Saving user ${name} with age ${age} to database...`)
}

saveUserToDatabase({ name: 'Philipe Morais', age: 18 })

const startServer = async () => {
  const app = express()

  app.use(express.json())

  app.use(routes)

  app.listen(process.env.PORT ? Number(process.env.PORT) : 3000, () => {
    console.log('HTTP Server running')
  })
}

startServer()
  .catch((error) => console.log(error))
  .finally(async () => {
    await prisma.$disconnect()
  })
