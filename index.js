const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')

const { join } = require('path')
const { ok } = require('assert')


const routes = require('./src/helpers/routesRequireHelper')

const env = process.env.NODE_ENV || 'dev'

ok(env==='dev' || env==='prod', "incorrect environment variable")

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

app.listen(process.env.PORT, () => console.log(`Server runnig in port ${process.env.PORT}`))