const routes = require('express').Router()

const Allow = require('../../middleware/permission')

const MoveController = require('../controller/move.controller')

routes.put('/pieces/:gameId', new Allow().qualification, new MoveController().updateMove )

module.exports = routes