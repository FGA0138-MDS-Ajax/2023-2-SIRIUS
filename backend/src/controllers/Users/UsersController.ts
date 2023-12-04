/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../../client'

export class UserController {
  async create(req: Request, res: Response) {
    try {

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
    } catch(e) {
      console.log('Erro ao criar usuario!')
      return res.status(500).send('Erro ao criar usuario')
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body
    try {

      const user = await prisma.user.findUnique({ where: { email } })

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
    } catch(e) {
      console.log('Erro ao fazer login')
      return res.status(500).send('Erro ao fazer login')
    }
  }

  async getProfile(req: Request, res: Response) {
    try {

      return res.status(200).json(req.user)
    } catch(e) {
      console.log('Erro ao obter dados de usuario')
      return res.status(500).send('Erro ao obter dados de usuario')
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    try {

      const user = await prisma.user.findUnique({ where: { id } })

      if (!user) {
        return res.status(400).send('Usuário não encontrado')
      }

      await prisma.user.delete({ where: { id } })

      return res.status(200).send('Usuário deletado com sucesso')
    } catch(e) {
      console.log('Erro ao deletar usuario')
      return res.status(500).send('Erro ao deletar usuario')
    }
  }
}
