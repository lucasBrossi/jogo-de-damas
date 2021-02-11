
const Database = require('../service')
const GameController = require('./game.controller')

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

        var tab = responseGame.responsePieces[0].tab
        var points = responseGame.responseGame[0].points
        var newPoints = {
            w:0,
            b:0
        }
        var playerTurn = responseGame.responseGame[0].playerTurn
        var validMove

        const playerTurnPiece = tab[move[0]][move[1]]

        /* var movesSixthCap = []
        var movesFifthCap = []
        var movesFourthCap = []
        var movesThirdCap = []
        var movesSecondCap = [] */

        var movesFirstCap = []
        var movesSimple = []
        var impossibleMove = false
        var finalMoves = []

        responseGame.responseMoves.map(e => {

            /* if (e.length === 11) {  
                
                movesSixthCap.push(e)
            
            } else if (e.length === 10) {
                
                movesFifthCap.push(e)
            
            } else if (e.length === 9) {
                
                movesFourthCap.push(e)
            
            } else if (e.length === 8) {
                
                movesThirdCap.push(e)
            
            } else if (e.length === 7) {
                
                movesSecondCap.push(e)
            
            } else  */
            if (e.length === 6) {

                movesFirstCap.push(e)

            } else if (e.length === 4) {

                movesSimple.push(e)

            } else {
                impossibleMove = true
            }
        })

        /* if(movesSixthCap.length > 0) {
            finalMoves = movesFourthCap
            validMove = finalMoves.filter(e => e.toString() === move.toString())

            if (validMove.length > 0) {

                tab[move[0]][move[1]] = 'e'
                tab[move[2]][move[3]] = 'e'
                tab[move[6][2]][move[6][3]] = 'e'
                tab[move[7][2]][move[7][3]] = 'e'
                tab[move[8][2]][move[8][3]] = 'e'
                tab[move[9][2]][move[9][3]] = 'e'
                tab[move[10][2]][move[10][3]] = 'e'
                tab[move[10][4]][move[10][5]] = (move[10][4] === 0 && playerTurn === 'player1' && playerTurnPiece === 'w') || (move[10][4] === 7 && playerTurn === 'player2' && playerTurnPiece === 'b') ? `${playerTurnPiece}q` : playerTurnPiece

                playerTurn === 'player1' ? points.w += 4 : points.b += 4

                playerTurn = playerTurn === 'player1' ? 'player2' : 'player1'
            } else {
                return res.status(400).send({ error: "invalid move" })
            }

        } else if(movesFifthCap.length > 0) {
            finalMoves = movesFourthCap

            validMove = finalMoves.filter(e => e.toString() === move.toString())
            if (validMove.length > 0) {

                tab[move[0]][move[1]] = 'e'
                tab[move[2]][move[3]] = 'e'
                tab[move[6][2]][move[6][3]] = 'e'
                tab[move[7][2]][move[7][3]] = 'e'
                tab[move[8][2]][move[8][3]] = 'e'
                tab[move[9][2]][move[9][3]] = 'e'
                tab[move[9][4]][move[9][5]] = (move[9][4] === 0 && playerTurn === 'player1' && playerTurnPiece === 'w') || (move[9][4] === 7 && playerTurn === 'player2' && playerTurnPiece === 'b') ? `${playerTurnPiece}q` : playerTurnPiece

                playerTurn === 'player1' ? points.w += 5 : points.b += 5

                playerTurn = playerTurn === 'player1' ? 'player2' : 'player1'
            } else {
                return res.status(400).send({ error: "invalid move" })
            }

        } else if (movesFourthCap.length > 0) {
            finalMoves = movesFourthCap

            validMove = finalMoves.filter(e => e.toString() === move.toString())
            if (validMove.length > 0) {

                tab[move[0]][move[1]] = 'e'
                tab[move[2]][move[3]] = 'e'
                tab[move[6][2]][move[6][3]] = 'e'
                tab[move[7][2]][move[7][3]] = 'e'
                tab[move[8][2]][move[8][3]] = 'e'
                tab[move[8][4]][move[8][5]] = (move[8][4] === 0 && playerTurn === 'player1' && playerTurnPiece === 'w') || (move[8][4] === 7 && playerTurn === 'player2' && playerTurnPiece === 'b') ? `${playerTurnPiece}q` : playerTurnPiece

                playerTurn === 'player1' ? points.w += 4 : points.b += 4

                playerTurn = playerTurn === 'player1' ? 'player2' : 'player1'
            } else {
                return res.status(400).send({ error: "invalid move" })
            }

        } else if (movesThirdCap.length > 0) {
            finalMoves = movesThirdCap
            
            validMove = finalMoves.filter(e => e.toString() === move.toString())
            if (validMove.length > 0) {

                tab[move[0]][move[1]] = 'e'
                tab[move[2]][move[3]] = 'e'
                tab[move[6][2]][move[6][3]] = 'e'
                tab[move[7][2]][move[7][3]] = 'e'
                tab[move[7][4]][move[7][5]] = (move[7][4] === 0 && playerTurn === 'player1' && playerTurnPiece === 'w') || (move[7][4] === 7 && playerTurn === 'player2' && playerTurnPiece === 'b') ? `${playerTurnPiece}q` : playerTurnPiece

                playerTurn === 'player1' ? points.w += 3 : points.b += 3

                playerTurn = playerTurn === 'player1' ? 'player2' : 'player1'
            } else {
                return res.status(400).send({ error: "invalid move" })
            }

        } else if (movesSecondCap.length > 0) {
            finalMoves = movesSecondCap
            validMove = finalMoves.filter(e => e.toString() === move.toString())

            if (validMove.length > 0) {

                tab[move[0]][move[1]] = 'e'
                tab[move[2]][move[3]] = 'e'
                tab[move[6][2]][move[6][3]] = 'e'
                tab[move[6][4]][move[6][5]] = (move[6][4] === 0 && playerTurn === 'player1' && playerTurnPiece === 'w') || (move[6][4] === 7 && playerTurn === 'player2' && playerTurnPiece === 'b') ? `${playerTurnPiece}q` : playerTurnPiece

                playerTurn === 'player1' ? points.w += 2 : points.b += 2

                playerTurn = playerTurn === 'player1' ? 'player2' : 'player1'
            } else {
                return res.status(400).send({ error: "invalid move" })
            }

        } else  */
        if (movesFirstCap.length > 0) {
            finalMoves = movesFirstCap
            validMove = finalMoves.filter(e => e.toString() === move.toString())

            if (validMove.length > 0) {

                tab[move[0]][move[1]] = 'e'
                tab[move[2]][move[3]] = 'e'
                tab[move[4]][move[5]] = (move[4] === 0 && playerTurn === 'player1' && playerTurnPiece === 'w') || (move[4] === 7 && playerTurn === 'player2' && playerTurnPiece === 'b') ? `${playerTurnPiece}q` : playerTurnPiece

                playerTurn === 'player1' ? newPoints.w++ : newPoints.b++

                playerTurn = (playerTurn === 'player1') ? 'player2' : 'player1'

                points.w += newPoints.w
                points.b += newPoints.b

            } else {
                return res.status(400).send({ error: "invalid move" })
            }

        } else if (movesSimple.length > 0) {

            finalMoves = movesSimple
            validMove = finalMoves.filter(e => e.toString() === move.toString())

            if (validMove.length > 0) {

                tab[move[0]][move[1]] = 'e'
                tab[move[2]][move[3]] = (move[2] === 0 && playerTurn === 'player1' && playerTurnPiece === 'w') || (move[2] === 7 && playerTurn === 'player2' && playerTurnPiece === 'b') ? `${playerTurnPiece}q` : playerTurnPiece

                playerTurn = (playerTurn === 'player1') ? 'player2' : 'player1'
            } else {
                return res.status(400).send({ error: "invalid move" })
            }

        } else {
            return res.status(200).send({ message: "Fim de Jogo, Nenhum movimento eh possivel" })
        }

        validMove = finalMoves.filter(e => e.toString() === move.toString())

        if (validMove.length > 0) {

            const setPieces = {
                tab
            }

            const setGame = {
                points
            }

            const responsePlayerMove = await new Database('src/db/pieces.json').update(gameId, setPieces)

            const responsePlayerGame = await new Database('src/db/games.json').update(gameId, setGame)

            let nextMoves = await new GameController().getGame(env, null, null)

            var parcialResponse = {
                responsePlayerGame,
                responsePlayerMove,
                scoreBoard: nextMoves.responseGame[0].points,
                nextMoves: nextMoves.responseMoves
            }

            if (nextMoves.responseMoves[0].length === 6 && (newPoints.b > 0|| newPoints.w > 0) && move.length === 6) {

                playerTurn = (playerTurn === 'player1') ? 'player2' : 'player1'

                parcialResponse = {
                    ...parcialResponse,
                    ...playerTurn
                }           

                return res.status(200).send(parcialResponse)
                
            } else {

                const setTurn = {
                    playerTurn
                }

                await new Database('src/db/games.json').update(gameId, setTurn) 

                nextMoves = await new GameController().getGame(env, null, null)

                const finalResponse = {
                    responsePlayerGame,
                    responsePlayerMove,
                    scoreBoard: nextMoves.responseGame[0].points,
                    playerTurn,
                    nextMoves: nextMoves.responseMoves
                }

                return res.status(200).send(finalResponse)
            }

        }

        return res.status(400).send({ error: "invalid move" })
    }
}

module.exports = MoveController
