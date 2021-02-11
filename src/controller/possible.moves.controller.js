class PossibleMovesController {
    constructor(PLAYER_TURN, TAB) {
        this.PLAYER_TURN = PLAYER_TURN
        this.TAB = TAB
        return this.nextMoves()
    }

    nextMoves() {

        const newMoves = this.simpleMoves()

        let newPositions = this.firstCaptureMove()

        if (newPositions.length > 0) {

            /* let newPositions2 = this.secondCaptureMove(newPositions)
            let newPositions3 = this.otherCaptureMoves(newPositions2, 6)
            let newPositions4 = this.otherCaptureMoves(newPositions3, 7)
 */
            return newPositions

        } else {

            return newMoves
        }
    }

    //THE SIMPLE MOVE LIST IS CREATED HERE

    simpleMoves() {

        const tab = this.TAB

        let newMoves = this.queenMoves()

        for (var i = 0; i <= 7; i++) {
            for (var j = 0; j <= 7; j++) {
                if (this.PLAYER_TURN === 'player1') {

                    if (tab[i][j] === 'w') {

                        if (!!tab[i - 1] && tab[i - 1][j + 1] === 'e') {
                            newMoves.push([i, j, i - 1, j + 1])
                        }

                        if (!!tab[i - 1] && tab[i - 1][j - 1] === 'e') {
                            newMoves.push([i, j, i - 1, j - 1])
                        }
                    }

                } else {

                    if (tab[i][j] === 'b') {

                        if (!!tab[i + 1] && tab[i + 1][j + 1] === 'e') {
                            newMoves.push([i, j, i + 1, j + 1])
                        }

                        if (!!tab[i + 1] && tab[i + 1][j - 1] === 'e') {
                            newMoves.push([i, j, i + 1, j - 1])
                        }

                    }

                }
            }
        }

        return newMoves
    }

    queenMoves() {

        const tab = this.TAB

        var playerTurnPiece = this.PLAYER_TURN === "player1" ? 'wq' : 'bq'

        let newQueenMoves = []

        for (var i = 0; i <= 7; i++) {
            for (var j = 0; j <= 7; j++) {
                if (tab[i][j] === playerTurnPiece) {

                    if (!!tab[i - 1] && tab[i - 1][j + 1] === 'e') {
                        newQueenMoves.push([i, j, i - 1, j + 1])
                    }

                    if (!!tab[i - 1] && tab[i - 1][j - 1] === 'e') {
                        newQueenMoves.push([i, j, i - 1, j - 1])
                    }

                    if (!!tab[i + 1] && tab[i + 1][j + 1] === 'e') {
                        newQueenMoves.push([i, j, i + 1, j + 1])
                    }

                    if (!!tab[i + 1] && tab[i + 1][j - 1] === 'e') {
                        newQueenMoves.push([i, j, i + 1, j - 1])
                    }

                }
            }
        }

        return newQueenMoves
    }

    //THE FIRST CAPTURE POSSIBLE MOVE

    firstCaptureMove() {

        const tab = this.TAB

        let newMoves = []

        var playerTurnPieceQueen = this.PLAYER_TURN === "player1" ? 'wq' : 'bq'
        var playerTurnPiece = this.PLAYER_TURN === "player1" ? 'w' : 'b'
        var oponentPieceQueen = this.PLAYER_TURN === "player1" ? 'bq' : 'wq'
        var oponentPiece = this.PLAYER_TURN === "player1" ? 'b' : 'w'

        for (var i = 0; i <= 7; i++) {
            for (var j = 0; j <= 7; j++) {

                if (tab[i][j] === playerTurnPiece || tab[i][j] === playerTurnPieceQueen) {

                    if (!!tab[i - 1] && (tab[i - 1][j + 1] === oponentPiece || tab[i - 1][j + 1] === oponentPieceQueen)) {

                        if (!!tab[i - 2] && tab[i - 2][j + 2] === 'e') {

                            newMoves.push([i, j, i - 1, j + 1, i - 2, j + 2])
                        }
                    }

                    if (!!tab[i - 1] && (tab[i - 1][j - 1] === oponentPiece || tab[i - 1][j - 1] === oponentPieceQueen)) {

                        if (!!tab[i - 2] && tab[i - 2][j - 2] === 'e') {

                            newMoves.push([i, j, i - 1, j - 1, i - 2, j - 2])
                        }
                    }

                    if (!!tab[i + 1] && (tab[i + 1][j + 1] === oponentPiece || tab[i + 1][j + 1] === oponentPieceQueen)) {

                        if (!!tab[i + 2] && tab[i + 2][j + 2] === 'e') {

                            newMoves.push([i, j, i + 1, j + 1, i + 2, j + 2])
                        }
                    }

                    if (!!tab[i + 1] && (tab[i + 1][j - 1] === oponentPiece || tab[i + 1][j - 1] === oponentPieceQueen)) {

                        if (!!tab[i + 2] && tab[i + 2][j - 2] === 'e') {

                            newMoves.push([i, j, i + 1, j - 1, i + 2, j - 2])
                        }
                    }
                }
            }
        }

        return newMoves

    }

    /* //THE SECOND CAPTURE

    secondCaptureMove(newPositions) {

        const tab = this.TAB

        let newMoves = newPositions

        var oponentPieceQueen = this.PLAYER_TURN === "player1" ? 'bq' : 'wq'
        var oponentPiece = this.PLAYER_TURN === "player1" ? 'b' : 'w'

        newMoves.forEach(e => {

            if (!!tab[e[4] - 1] && (tab[e[4] - 1][e[5] + 1] === oponentPiece || tab[e[4] - 1][e[5] + 1] === oponentPieceQueen) && (e[4] - 1 !== e[2] || e[5] + 1 !== e[3])) {

                if (!!tab[e[4] - 2] && tab[e[4] - 2][e[5] + 2] === 'e') {

                    e.push(e[4] - 1, e[5] + 1, e[4] - 2, e[5] + 2)
                }
            }
        

            if (!!tab[e[4] - 1] && (tab[e[4] - 1][e[5] - 1] === oponentPiece || tab[e[4] - 1][e[5] - 1] === oponentPieceQueen) && (e[4] - 1 !== e[2] || e[5] - 1 !== e[3])) {

                if (!!tab[e[4] - 2] && tab[e[4] - 2][e[5] - 2] === 'e') {

                    e.push(e[4] - 1, e[5] - 1, e[4] - 2, e[5] - 2)
                }
            }

            if (!!tab[e[4] + 1] && (tab[e[4] + 1][e[5] + 1] === oponentPiece || tab[e[4] + 1][e[5] + 1] === oponentPieceQueen) && (e[4] + 1 !== e[2] || e[5] + 1 !== e[3])) {

                if (!!tab[e[4] + 2] && tab[e[4] + 2][e[5] + 2] === 'e') {

                    e.push(e[4] + 1, e[5] + 1, e[4] + 2, e[5] + 2)
                }
            }

            if (!!tab[e[4] + 1] && (tab[e[4] + 1][e[5] - 1] === oponentPiece || tab[e[4] + 1][e[5] - 1] === oponentPieceQueen) && (e[4] + 1 !== e[2] || e[5] - 1 !== e[3])) {

                if (!!tab[e[4] + 2] && tab[e[4] + 2][e[5] - 2] === 'e') {

                    e.push(e[4] + 1, e[5] - 1, e[4] + 2, e[5] - 2)
                }
            }



        })

        return newMoves
    }

    //THE OTHER CAPTURES AFTER DE SECOND AND DE FIRST ONE

    otherCaptureMoves(newPositions, num) {

        const tab = this.TAB

        let newMoves = newPositions

        var oponentPieceQueen = this.PLAYER_TURN === "player1" ? 'bq' : 'wq'
        var oponentPiece = this.PLAYER_TURN === "player1" ? 'b' : 'w'

        newMoves.forEach(e => {

            if (this.PLAYER_TURN === "player1") {

                if (!!tab[e[num][4] - 1] && (tab[e[num][4] - 1][e[num][5] + 1] === oponentPiece || tab[e[num][4] - 1][e[num][5] + 1] === oponentPieceQueen)) {

                    if (!!tab[e[num][4] - 2] && (tab[e[num][4] - 2][e[num][5] + 2] === 'e')) {

                        e.push([e[num][4], e[num][5], e[num][4] - 1, e[num][5] + 1, e[num][4] - 2, e[num][5] + 2])
                    }
                }

                if (!!tab[e[num][4] - 1] && (tab[e[num][4] - 1][e[num][5] - 1] === oponentPiece || tab[e[num][4] - 1][e[num][5] - 1] === oponentPieceQueen)) {

                    if (!!tab[e[num][4] - 2] && (tab[e[num][4] - 2][e[num][5] - 2] === 'e')) {

                        e.push([e[num][4], e[num][5], e[num][4] - 1, e[num][5] - 1, e[num][4] - 2, e[num][5] - 2])
                    }
                }

            } else {

                if (!!tab[e[num][4] + 1] && (tab[e[num][4] + 1][e[num][5] + 1] === oponentPiece || tab[e[num][4] + 1][e[num][5] + 1] === oponentPieceQueen)) {

                    if (!!tab[e[num][4] + 2] && tab[e[num][4] + 2][e[num][5] + 2] === 'e') {

                        e.push([e[num][4], e[num][5], e[num][4] + 1, e[num][5] + 1, e[num][4] + 2, e[num][5] + 2])
                    }
                }

                if (!!tab[e[num][4] + 1] && (tab[e[num][4] + 1][e[num][5] - 1] === oponentPiece || tab[e[num][4] + 1][e[num][5] - 1] === oponentPieceQueen)) {

                    if (!!tab[e[num][4] + 2] && tab[e[num][4] + 2][e[num][5] - 2] === 'e') {

                        e.push([e[num][4], e[num][5], e[num][4] + 1, e[num][5] - 1, e[num][4] + 2, e[num][5] - 2])
                    }
                }
            }

        })

        return newMoves
    } */

}
module.exports = PossibleMovesController