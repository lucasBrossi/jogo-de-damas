class PossibleMovesController {
    constructor(PLAYER_TURN, TAB) {
        this.PLAYER_TURN = PLAYER_TURN
        this.TAB = TAB
        return this.nextMoves()
    }

    nextMoves() {

        const newMoves = this.simpleMoves()

        const newPositions = this.firstCaptureMove()

        if (newPositions.length > 0) {

            return newPositions

        } else {

            return newMoves
        }
    }

    //THE ALL SIMPLE MOVES ARE CREATED HERE

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

    //THE ALL CAPTURE POSSIBLE MOVES

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
}

module.exports = PossibleMovesController