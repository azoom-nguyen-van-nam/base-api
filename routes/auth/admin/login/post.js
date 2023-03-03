import knex from '@/database'
import { getToken } from '@middlewares/auth'
import { userRole } from '@constants/user'

export default async (req, res) => {
  const { email, password } = req.body
  if (!email && !password) return res.sendStatus(400)

  const admin = await getAdmin(email, password)
  if (!admin) return res.sendStatus(404)

  const { id } = admin
  const token = getToken({ id, email, role: userRole.admin })
  await setToken(id, token)
  res.send({ id, email, role: userRole.admin, token })
}

const getAdmin = (email, password) => {
  return knex('users')
    .select('id')
    .where('email', email)
    .where('password', password)
    .where('role', userRole.admin)
    .first()
}

const setToken = (id, token) => {
  return knex('users').where('id', id).update('token', token)
}
