import knex from '@/database'

export default async (req, res) => {
  const { id } = req.user
  await clearToken(id)
  return res.sendStatus(200)
}

const clearToken = id => {
  return knex('users').where('id', id).update('token', null)
}
