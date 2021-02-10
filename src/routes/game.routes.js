const routes = require('express').Router()

const Allow = require('../../middleware/permission')

const GameController = require('../controller/game.controller')

routes.get('/game', new Allow().qualification, new GameController().getGame)

routes.post('/game', new GameController().postGame)

module.exports = routes