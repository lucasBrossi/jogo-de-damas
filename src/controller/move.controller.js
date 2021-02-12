const Database = require('../crud')
const GameController = require('./game.controller')

class MoveController {
    
    async updateMove(req, res, next) {

        const { move } = req.body

        const { gameId } = req.params

        if(!req.body.idPlayer2) {
            return req.status(400).send({error: 'Id Player2 is not in body'})
        }

        const MOCK_GETGAME = {
            query: {
                gameId
            },
            player: {
                gameId: req.player.gameId
            },
            body: {
                idPlayer2: req.body.idPlayer2
            }
        };

        const responseGame = await new GameController().getGameToMove(MOCK_GETGAME)

        if(responseGame==='Id not found') { return res.status(404).send({error: 'Game id is not found'})}

        var tab = responseGame.responsePieces[0].tab
        var points = responseGame.responseGame[0].points
        var playerTurn = responseGame.responseGame[0].playerTurn

        var newPoints = {
            w: 0,
            b: 0
        }

        var validMove

        const playerTurnPiece = tab[move[0]][move[1]]

        var movesFirstCap = []
        var movesSimple = []
        var finalMoves = []

        responseGame.responseMoves.map(e => {

            if (e.length === 6) {

                movesFirstCap.push(e)

            } else {

                movesSimple.push(e)

            }
        })

        if (movesFirstCap.length > 0) {

            finalMoves = movesFirstCap;
            validMove = finalMoves.filter(e => e.toString() === move.toString())

            if (validMove.length > 0) {

                tab[move[0]][move[1]] = 'e'
                tab[move[2]][move[3]] = 'e'
                tab[move[4]][move[5]] = playerTurnPiece

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
                tab[move[2]][move[3]] = (move[2] === 0 && playerTurnPiece === 'w') || (move[2] === 7 && playerTurnPiece === 'b') ? `${playerTurnPiece}q` : playerTurnPiece

                playerTurn = (playerTurn === 'player1') ? 'player2' : 'player1'
            } else {
                return res.status(400).send({ error: "invalid move" })
            }

        } else {
            return res.status(200).send({ message: "Game Over, draw" })
        }

        if (validMove.length > 0) {

            const setPieces = {
                tab
            }

            const setGame = {
                points
            }

            await new Database('src/db/pieces.json').update(gameId, setPieces)

            await new Database('src/db/games.json').update(gameId, setGame)

            const nextGame = await new GameController().getGameToMove(MOCK_GETGAME)

            let nextMoves = nextGame.responseMoves

            if (!!nextMoves[0] && nextMoves[0].length === 6 && (newPoints.b > 0 || newPoints.w > 0) && move.length === 6 && ((nextMoves[0][0] === move[4] && nextMoves[0][1] === move[5]) ||
                (!!nextMoves[1] && nextMoves[1][0] === move[4] && nextMoves[1][1] === move[5]) ||
                (!!nextMoves[2] && nextMoves[2][0] === move[4] && nextMoves[2][1] === move[5]))) {

                playerTurn = (playerTurn === 'player1') ? 'player2' : 'player1'

                nextMoves = nextMoves.filter(e => e[0]===move[4]&&e[1]===move[5])

                const finalResponse = {

                    playerTurn,
                    scoreBoard: nextGame.responseGame[0].points,
                    nextMoves

                }


                return res.status(200).send(finalResponse)

            } else {

                if(move[4]!==undefined) {
                    tab[move[4]][move[5]] = (move[4] === 0 && playerTurnPiece === 'w') || (move[4] === 7 && playerTurnPiece === 'b') ? `${playerTurnPiece}q` : playerTurnPiece
                }

                const setTurn = {
                    playerTurn
                }

                const setRealPiece = {
                    tab
                }

                await new Database('src/db/games.json').update(gameId, setTurn)

                await new Database('src/db/pieces.json').update(gameId, setRealPiece)

                nextMoves = await new GameController().getGameToMove(MOCK_GETGAME)

                const finalResponse = {

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
