/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../../client'
import { IUserDataProps } from '../../types/types'

export class UserController {
  async create(userData: IUserDataProps) {

    const userExists = await prisma.user.findUnique({ where: { email: userData.email } })

    if (userExists) {
      return null
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashPassword,
      },
    })

    const { password: _, ...user } = newUser || {}

    return { user, token: null }
  }

  async login(userData: IUserDataProps) {

    const user = await prisma.user.findUnique({ where: { email: userData.email } })

    if (!user) {
      return (null)
    }

    const verifyPass = await bcrypt.compare(userData.password, user.password)

    if (!verifyPass) {
      return (null)
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
      expiresIn: '1d',
    })

    const { password: _, ...userLogin } = user

    return ({ user: userLogin, token: token })
  }

  async getProfile(req: Request, res: Response) {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } })

    return res.json(user)
  }
}