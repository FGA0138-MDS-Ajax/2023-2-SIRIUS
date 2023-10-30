/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

type JwtPayload = {
    id: number
}

const prisma = new PrismaClient()

export const authMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Token not authorized' })
  }

  const token = authorization.split(' ')[1]

  const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

  const user = await prisma.user.findUnique({ where: { id } })

  if (!user) {
    return res.status(400).json({ error: 'User not found' })
  }

  const { password: _, ...loggedUser } = user

  req.user = { ...loggedUser }

  next()
}