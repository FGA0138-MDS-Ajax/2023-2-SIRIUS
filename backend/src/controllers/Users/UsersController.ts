/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../../client'

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body

    const userExists = await prisma.user.findUnique({ where: { email } })

    if (userExists) {
      return res.status(400).send('E-mail já existe')
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword
      }
    })

    const { password: _, ...user } = newUser || {}

    return res.status(201).json(user)
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body
    console.log(req.body)
    const user = await prisma.user.findUnique({ where: { email } })
    const varios = await prisma.user.findMany()
    console.log(user)
    console.log(varios)

    if (!user) {
      return res.status(400).send('E-mail ou senha inválidos')
    }

    const verifyPass = await bcrypt.compare(password, user.password)

    console.log(verifyPass)
    if (!verifyPass) {
      return res.status(400).send('E-mail ou senha inválidos')
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
      expiresIn: '7d',
    })

    const { password: _, ...userLogin } = user

    return res.json({
      user: userLogin,
      token: token,
    })
  }

  async getProfile(req: Request, res: Response) {
    return res.status(200).json(req.user)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return res.status(400).send('Usuário não encontrado')
    }

    await prisma.user.delete({ where: { id } })

    return res.status(200).send('Usuário deletado com sucesso')
  }
}