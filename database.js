import knex from 'knex'

let connection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8',
}

const queryBuilder = knex({
  connection,
  client: 'mysql2',
})

import { attachPaginate } from 'knex-paginate'
attachPaginate()

export default queryBuilder
