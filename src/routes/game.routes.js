const routes = require('express').Router()

const Allow = require('../../middleware/permission')

const GameController = require('../controller/game.controller')

routes.get('/games', new Allow().qualification, new GameController().getGame)

routes.post('/games', new GameController().postGame)

module.exports = routes