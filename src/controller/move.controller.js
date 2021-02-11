const Database = require('../crud')
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
        };

        const responseGame = await new GameController().getGame(env, null, null)

        var tab = responseGame.responsePieces[0].tab
        var points = responseGame.responseGame[0].points

        var newPoints = {
            w: 0,
            b: 0
        }

        var playerTurn = responseGame.responseGame[0].playerTurn
        var validMove

        const playerTurnPiece = tab[move[0]][move[1]]

        var movesFirstCap = []
        var movesSimple = []
        var impossibleMove = false
        var finalMoves = []

        responseGame.responseMoves.map(e => {

            if (e.length === 6) {

                movesFirstCap.push(e)

            } else if (e.length === 4) {

                movesSimple.push(e)

            } else {

                impossibleMove = true
            };
        });

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
            return res.status(200).send({ message: "Fim de Jogo, Nenhum movimento eh possivel" })
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

            const nextGame = await new GameController().getGame(env, null, null)

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

                tab[move[4]][move[5]] = (move[4] === 0 && playerTurnPiece === 'w') || (move[4] === 7 && playerTurnPiece === 'b') ? `${playerTurnPiece}q` : playerTurnPiece

                const setTurn = {
                    playerTurn
                }

                const setRealPiece = {
                    tab
                }

                await new Database('src/db/games.json').update(gameId, setTurn)

                await new Database('src/db/pieces.json').update(gameId, setRealPiece)

                nextMoves = await new GameController().getGame(env, null, null)

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
