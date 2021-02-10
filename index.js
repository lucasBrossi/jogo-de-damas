const express = require('express')
const { join } = require('path')
const { ok } = require('assert')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')

const routes = require('./src/helpers/routesRequireHelper')
/* const routes = require('./src/routes/game.routes') */

const env = process.env.NODE_ENV || 'dev'

ok(env==='dev' || env==='prod', "Esta variavel de ambiente esta incorreta")

const configPath = join(__dirname, "./configs", `.env.${env}`)

dotenv.config({
    path: configPath
})

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(cors())

Object.keys(routes).forEach(route => app.use(routes[route]))

app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`))