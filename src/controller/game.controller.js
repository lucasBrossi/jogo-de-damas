const Database = require('../service')
const PossibleMovesController = require('./possible.moves.controller')
const PlayerController = require('./player.controller')

const uniqid = require('uniqid')
const jwt = require('jsonwebtoken')

class GameController {

    async getGame(req, res, next) {

        const { gameId } = req.query
        const { idPlayer2 } = req.body

        if (gameId === req.player.gameId) {
            var responseGame = await new Database('src/db/games.json').read(gameId)
            if (responseGame[0].idPlayer2 === '') {
                if (!idPlayer2) {
                    return res.status(400).send('Id Player2 Nao informado')
                }

                const responseUpdatePlayer2 = await new PlayerController().updateGame(gameId, idPlayer2)
                responseGame = await new Database('src/db/games.json').read(gameId)
                if (!responseUpdatePlayer2) {
                    return res.status(404).send('notFound')
                }
            }

            const responsePieces = await new Database('src/db/pieces.json').read(gameId)

            const responseMoves = new PossibleMovesController(responseGame[0].playerTurn, responsePieces[0].tab)

            const response = {
                responseGame,
                responsePieces,
                responseMoves
            }

            if (res) {
                
                if (responseGame[0].points.w === 12) {
                    
                    return res.status(200).send({
                        message: `Fim de Jogo, Vitoria de ${responseGame[0].idPlayer1}`,
                        scoreboard: `White ${responseGame[0].points.w}:${responseGame[0].points.b} Black`
                    })

                } else if (responseGame[0].points.b === 12) {
                    
                    return res.status(200).send({
                        message: `Fim de Jogo, Vitoria de ${responseGame[0].idPlayer2}`,
                        scoreboard: `White ${responseGame[0].points.w}:${responseGame[0].points.b} Black`
                    })

                } else if (responseMoves.length === 0) {
                    
                    return res.status(200).send({ message: "Fim de Jogo" })
                } else {
                    
                    return res.status(200).send(response)
                }

            }
            return response

        } else {
            return res.status(401).send('Unauthorized!')
        }

    }

    async postGame(req, res, next) {
        const { idPlayer1 } = req.body

        const gameId = uniqid(idPlayer1)

        const tab = [
            ['b', 'e', 'b', 'e', 'b', 'e', 'b', 'e'],
            ['e', 'b', 'e', 'b', 'e', 'b', 'e', 'b'],
            ['b', 'e', 'b', 'e', 'b', 'e', 'b', 'e'],
            ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
            ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
            ['e', 'w', 'e', 'w', 'e', 'w', 'e', 'w'],
            ['w', 'e', 'w', 'e', 'w', 'e', 'w', 'e'],
            ['e', 'w', 'e', 'w', 'e', 'w', 'e', 'w']
        ]

        const data = {
            id: gameId,
            idPlayer1,
            idPlayer2: "",
            playerTurn: 'player1',
            points: {
                w: 0,
                b: 0
            }
        }
        const dataPieces = {
            id: gameId,
            tab
        }
        try {

            await new Database('src/db/pieces.json').create(dataPieces)

            await new Database('src/db/games.json').create(data)

            const resPiecesPosition = await new Database('src/db/pieces.json').read(gameId)

            const token = jwt.sign({
                idPlayer1,
                gameId
            }, 'playGame', {
                expiresIn: '1y'
            })

            const response = {
                idPlayer1,
                token,
                resPiecesPosition
            }

            return res.status(201).send(response)
        } catch (error) {
            return res.status(503).send(error)
        }
    }
}

module.exports = GameController