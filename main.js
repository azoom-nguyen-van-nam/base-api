import express from 'express'
import cors from 'cors'
import nnnRouter from 'nnn-router'
import bodyParser from 'body-parser'
import promiseRouter from 'express-promise-router'
import camelcaseKeys from 'camelcase-keys'
import statuses from 'statuses'
import handleError from '@middlewares/handleError'
import { fileUploadMiddleware } from '@middlewares/upload'
import { authMiddleware } from '@middlewares/auth'

const app = express()

// Customize express response
express.response.sendStatus = function (statusCode, message = null) {
  const body = {
    message: message || statuses(statusCode) || String(statusCode),
  }
  this.statusCode = statusCode
  this.type('json')
  this.send(body)
}

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
  (error, req, res, next) => {
    if (error) {
      return res.status(400).json({
        message: error.message,
      })
    }
    next()
  }
)

app.use(express.static('public'))
app.use(authMiddleware, fileUploadMiddleware)

app.use(
  nnnRouter({ routeDir: '/routes', baseRouter: promiseRouter() }),
  (error, req, res, next) => {
    handleError(error, req, res)
  }
)

app.listen(process.env.PORT || 8000, err => {
  if (err) {
    return console.error(err)
  }
  console.log(`Listening on port ${process.env.PORT || 8000}`)
})

export default app
