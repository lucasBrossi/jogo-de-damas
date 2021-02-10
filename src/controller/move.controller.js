
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
        })

        const playerTurn = responseGame.responseGame[0].playerTurn==='player1' ? 'w' : 'b'

        var tab = responseGame.responsePieces[0].tab

        if(moves6.length > 0) {
            finalMoves = moves6

            tab[move[0]][move[1]] = 'e'
            tab[move[6][2]][move[6][3]] = playerTurn
        } else if(moves5.length > 0) {
            finalMoves = moves5
        } else {
            finalMoves = moves4
        }

        const validMove = finalMoves.filter(e => e.toString()===move.toString())
        
        if(validMove.length > 0) {

            console.log(responseGame.responsePieces[0].tab[move[0]][move[1]])

            

            

            sets = { 
                tab: 
            }

           /*  if(responseGame.responseGame[0].playerTurn==='player1') {

                const responsePlayerMove = await new Database('src/db/pieces.json').update(gameId, )
            } */

        }

        return res.status(200).send('hellow')
    }
}

module.exports = MoveController
