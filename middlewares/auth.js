import express from 'express'
import { verify as jwtVerify, sign as jwtSign } from 'jsonwebtoken'
const router = new express.Router()
const secretKey = process.env.JWT_SECRET_KEY

export const authMiddleware = router.use(async (req, res, next) => {
  const bearerToken = req.headers.authorization || ''
  const token = bearerToken.replace('Bearer', '').trim()

  const publicRoutes = [
    '/auth/login',
    '/auth/admin/login',
    '/auth/sign-in',
    '/auth/sign-in/confirm',
  ]

  if (publicRoutes.includes(req.path)) return next()

  const { id, email, role } = decodeToken(token)
  if (!id) return res.sendStatus(401)
  req.user = { id, email, role }
  next()
})

export const decodeToken = token => {
  return jwtVerify(token, secretKey, (err, data) => {
    if (err) return {}
    return data
  })
}

export const getToken = payload => {
  return jwtSign(payload, secretKey)
}
