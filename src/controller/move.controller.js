
const Database = require('../service')
const GameController = require('./game.controller')
const PossibleMovesController = require('./possible.moves.controller')

class MoveController {
    async updateMove(req, res, next) {

        const { move } = req.body

        const { gameId } = req.params

        var env = {
            query: {
                gameId
            },
            player: {
                gameId: req.player.gameId
            },
            body: {
                idPlayer2: req.body.idPlayer2
            }
        }

        const responseGame = await new GameController().getGame(env, null, null)

        var moves6 = []
        var moves5 = []
        var moves4 = []
        var finalMoves = []
        
        responseGame.responseMoves.map(e => {
            if(e.length === 6) {
                moves6.push(e)
            } else if(e.length === 5) {
                moves5.push(e)
            } else {
                moves4.push(e)
            }

            console.log(e)
        })

        if(moves6.length > 0) {
            finalMoves = moves6
        } else if(moves5.length > 0) {
            finalMoves = moves5
        } else {
            finalMoves = moves4
        }

        console.log('52', move)

        const validMove = finalMoves.filter(e => e===move)
        console.log(validMove)

        return res.status(200).send('hellow')
    }
}

module.exports = MoveController
