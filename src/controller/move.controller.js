
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

        var moves7 = []
        var moves6 = []
        var moves5 = []
        var moves3 = []
        var impossibleMove = false
        var finalMoves = []
        
        responseGame.responseMoves.map(e => {
            if(e.length === 8) {
                moves7.push(e)
            } else if(e.length === 7) {
                moves6.push(e)
            } else if(e.length === 6) {
                moves5.push(e)
            } else if(e.length === 4){
                moves3.push(e)
            } else {
                impossibleMove = true
            }
            console.log(e)
        })

        var tab = responseGame.responsePieces[0].tab

        var points = responseGame.responseGame[0].points
        var playerTurn = responseGame.responseGame[0].playerTurn

        const playerTurnPiece = tab[move[0]][move[1]]

        if(moves7.length > 0) {
            finalMoves = moves7

            tab[move[0]][move[1]] = 'e'
            tab[move[2]][move[3]] = 'e'
            tab[move[6][2]][move[6][3]] = 'e'
            tab[move[7][2]][move[7][3]] = 'e'
            tab[move[7][4]][move[7][5]] = playerTurnPiece

            playerTurnPiece === 'w' ? points.w+=3 : points.b+=3

            playerTurn = playerTurn === 'player1' ? 'player2' : 'player1'

        } else if(moves6.length > 0) {
            finalMoves = moves6

            tab[move[0]][move[1]] = 'e'
            tab[move[2]][move[3]] = 'e'
            tab[move[6][2]][move[6][3]] = 'e'
            tab[move[6][4]][move[6][5]] = playerTurnPiece

            playerTurnPiece === 'w' ? points.w+=2 : points.b+=2

            playerTurn = playerTurn === 'player1' ? 'player2' : 'player1'

        } else if(moves5.length > 0){
            finalMoves = moves5

            tab[move[0]][move[1]] = 'e'
            tab[move[2]][move[3]] = 'e'
            tab[move[4]][move[5]] = playerTurnPiece

            playerTurnPiece === 'w' ? points.w++ : points.b++

            playerTurn = playerTurn === 'player1' ? 'player2' : 'player1'

        } else if(moves3.length > 0) {
            finalMoves = moves3 

            tab[move[0]][move[1]] = 'e'
            tab[move[2]][move[3]] = playerTurnPiece

            playerTurn = playerTurn === 'player1' ? 'player2' : 'player1'
        } else {
            return res.status(200).send({message: "Fim de Jogo"})
        }

        const validMove = finalMoves.filter(e => e.toString()===move.toString())
        
        if(validMove.length > 0) {

            console.log(responseGame.responsePieces[0].tab[move[0]][move[1]])

            

            

            /* sets = { 
                tab: 
            } */

           /*  if(responseGame.responseGame[0].playerTurn==='player1') {

                const responsePlayerMove = await new Database('src/db/pieces.json').update(gameId, )
            } */

        }

        return res.status(200).send('hellow')
    }
}

module.exports = MoveController
