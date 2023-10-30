/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body

    const userExists = await prisma.user.findUnique({ where: { email } })

    if (userExists) {
      return res.status(400).json({ error: 'Email already exists!' })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: { name, email, password: hashPassword },
    })

    const { password: _, ...user } = newUser

    return res.status(201).json(user)
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(400).json({ error: 'Email or password invalids' })
    }

    const verifyPass = await bcrypt.compare(password, user.password)

    if (!verifyPass) {
      return res.status(400).json({ error: 'Email or password invalids' })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
      expiresIn: '1d',
    })

    const { password: _, ...userLogin } = user

    return res.status(200).json({ user: userLogin, token: token })
  }

  async getProfile(req: Request, res: Response) {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } })

    return res.json(user)
  }
}