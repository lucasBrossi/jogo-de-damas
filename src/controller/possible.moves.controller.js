class PossibleMovesController {
    constructor(PLAYER_TURN) {
        this.PLAYER_TURN = PLAYER_TURN
    }

    nextMoves(tab) {

        let newMoves = this.queenMoves(tab)

        if (this.PLAYER_TURN === "player1") {
            for (var i = 0; i <= 7; i++) {
                for (var j = 0; j <= 7; j++) {
                    if (tab[i][j] === 'w') {

                        if (tab[i - 1][j + 1] === 'e') {
                            newMoves.push([i, j, i - 1, j + 1])
                        }

                        if (tab[i - 1][j - 1] === 'e') {
                            newMoves.push([i, j, i - 1, j - 1])
                        }
                    }
                }
            }
        } else {
            for (var i = 0; i <= 7; i++) {
                for (var j = 0; j <= 7; j++) {
                    if (tab[i][j] === 'b') {

                        if (tab[i + 1][j + 1] === 'e') {
                            newMoves.push([i, j, i + 1, j + 1])
                        }

                        if (tab[i + 1][j - 1] === 'e') {
                            newMoves.push([i, j, i + 1, j - 1])
                        }
                    }
                }
            }
        }

        var newPositions = this.captureMove(tab, null, null)

        if (newPositions.length > 0) {

            var newPositions2 = this.captureMove(tab, newPositions, null)
            var newPositions3 = this.captureMove(tab, newPositions2, 6)

            return newPositions3


        } else {
            return newMoves

        }
    }

    captureMove(tab, newPositions, num) {

        let newMoves = newPositions || []

        if (newPositions) {
            if (num) {

                if (this.PLAYER_TURN === "player1") {
                    newMoves.forEach(e => {

                        if (e[num]) {
                            if (!((tab[e[num][4] - 1]) === undefined) && tab[e[num][4] - 1][e[num][5] + 1] === 'b' || tab[e[num][4] - 1][e[num][5] + 1] === 'bq') {
                                if (!((tab[e[num][4] - 2]) === undefined) && tab[e[num][4] - 2][e[num][5] + 2] === 'e') {
                                    e.push([e[num][4], e[num][5], e[num][4] - 1, e[num][5] + 1, e[num][4] - 2, e[num][5] + 2])

                                }
                            }

                            if (!((tab[e[num][4] - 1]) === undefined) && tab[e[num][4] - 1][e[num][5] - 1] === 'b' || tab[e[num][4] - 1][e[num][5] - 1] === 'bq') {
                                if (!((tab[e[num][4] - 2]) === undefined) && tab[e[num][4] - 2][e[num][5] - 2] === 'e') {
                                    e.push([e[num][4], e[num][5], e[num][4] - 1, e[num][5] - 1, e[num][4] - 2, e[num][5] - 2])
                                }
                            }
                        }
                    })
                } else {
                    newMoves.forEach(e => {

                        if (e[num]) {
                            if (!((tab[e[num][4] + 1]) === undefined) && tab[e[num][4] + 1][e[num][5] + 1] === 'w' || tab[e[num][4] + 1][e[num][5] + 1] === 'wq') {
                                if (!((tab[e[num][4] + 2]) === undefined) && tab[e[num][4] + 2][e[num][5] + 2] === 'e') {
                                    e.push([e[num][4], e[num][5], e[num][4] + 1, e[num][5] + 1, e[num][4] + 2, e[num][5] + 2])

                                }
                            }

                            if (!((tab[e[num][4] + 1]) === undefined) && tab[e[num][4] + 1][e[num][5] - 1] === 'w' || tab[e[num][4] + 1][e[num][5] - 1] === 'wq') {
                                if (!((tab[e[num][4] + 2]) === undefined) && tab[e[num][4] + 2][e[num][5] - 2] === 'e') {
                                    e.push([e[num][4], e[num][5], e[num][4] + 1, e[num][5] - 1, e[num][4] + 2, e[num][5] - 2])
                                }
                            }
                        }
                    })

                }
            } else {
                if (this.PLAYER_TURN === "player1") {
                    newMoves.forEach(e => {


                        if (!((tab[e[4] - 1]) === undefined) && tab[e[4] - 1][e[5] + 1] === 'b' || tab[e[4] - 1][e[5] + 1] === 'bq') {
                            if (!((tab[e[4] - 2]) === undefined) && tab[e[4] - 2][e[5] + 2] === 'e') {
                                e.push([e[4], e[5], e[4] - 1, e[5] + 1, e[4] - 2, e[5] + 2])
                            }
                        }

                        if (!((tab[e[4] - 1]) === undefined) && tab[e[4] - 1][e[5] - 1] === 'b' || tab[e[4] - 1][e[5] - 1] === 'b') {
                            if (!((tab[e[4] - 2]) === undefined) && tab[e[4] - 2][e[5] - 2] === 'e') {
                                e.push([e[4], e[5], e[4] - 1, e[5] - 1, e[4] - 2, e[5] - 2])
                            }
                        }
                    })
                } else {
                    newMoves.forEach(e => {


                        if (!((tab[e[4] + 1]) === undefined) && tab[e[4] + 1][e[5] + 1] === 'b' || tab[e[4] + 1][e[5] + 1] === 'bq') {
                            if (!((tab[e[4] + 2]) === undefined) && tab[e[4] + 2][e[5] + 2] === 'e') {
                                e.push([e[4], e[5], e[4] + 1, e[5] + 1, e[4] + 2, e[5] + 2])
                            }
                        }

                        if (!((tab[e[4] + 1]) === undefined) && tab[e[4] + 1][e[5] - 1] === 'b' || tab[e[4] + 1][e[5] - 1] === 'b') {
                            if (!((tab[e[4] + 2]) === undefined) && tab[e[4] + 2][e[5] - 2] === 'e') {
                                e.push([e[4], e[5], e[4] + 1, e[5] - 1, e[4] + 2, e[5] - 2])
                            }
                        }
                    })
                }
            }
        } else {
            if (this.PLAYER_TURN === "player1") {
                for (var i = 0; i <= 7; i++) {
                    for (var j = 0; j <= 7; j++) {
                        if (tab[i][j] === 'w' || tab[i][j] === 'wq') {

                            if (!(tab[i - 1]===undefined) && tab[i - 1][j + 1] === 'b' || tab[i - 1][j + 1] === 'bq') {
                                if (tab[i - 2][j + 2] === 'e') {
                                    newMoves.push([i, j, i - 1, j + 1, i - 2, j + 2])
                                }
                            }

                            if (!(tab[i - 1]===undefined) && tab[i - 1][j - 1] === 'b' || tab[i - 1][j - 1] === 'bq') {
                                if (tab[i - 2][j - 2] === 'e') {
                                    newMoves.push([i, j, i - 1, j - 1, i - 2, j - 2])
                                }
                            }

                            if (!(tab[i + 1]===undefined) && tab[i + 1][j + 1] === 'b' || tab[i + 1][j + 1] === 'bq') {
                                if (tab[i + 2][j + 2] === 'e') {
                                    newMoves.push([i, j, i + 1, j + 1, i + 2, j + 2])
                                }
                            }

                            if (!(tab[i + 1]===undefined) && tab[i + 1][j - 1] === 'b' || tab[i + 1][j - 1] === 'bq') {
                                if (tab[i + 2][j - 2] === 'e') {
                                    newMoves.push([i, j, i + 1, j - 1, i + 2, j - 2])
                                }
                            }
                        }
                    }
                }
            } else {
                for (var i = 0; i <= 7; i++) {
                    for (var j = 0; j <= 7; j++) {
                        if (tab[i][j] === 'b' || tab[i][j] === 'bq') {

                            if (!(tab[i + 1]===undefined) && tab[i + 1][j + 1] === 'w' || tab[i + 1][j + 1] === 'wq') {
                                if (tab[i + 2][j + 2] === 'e') {
                                    newMoves.push([i, j, i + 1, j + 1, i + 2, j + 2])
                                }
                            }

                            if (!(tab[i + 1]===undefined) && tab[i + 1][j - 1] === 'w' || tab[i + 1][j - 1] === 'wq') {
                                if (tab[i + 2][j - 2] === 'e') {
                                    newMoves.push([i, j, i + 1, j - 1, i + 2, j - 2])
                                }
                            }

                            if (!(tab[i - 1]===undefined) && tab[i - 1][j + 1] === 'w' || tab[i - 1][j + 1] === 'wq') {
                                if (tab[i - 2][j + 2] === 'e') {
                                    newMoves.push([i, j, i - 1, j + 1, i - 2, j + 2])
                                }
                            }

                            if (!(tab[i - 1]===undefined) && tab[i - 1][j - 1] === 'w' || tab[i - 1][j - 1] === 'wq') {
                                if (tab[i - 2][j - 2] === 'e') {
                                    newMoves.push([i, j, i - 1, j - 1, i - 2, j - 2])
                                }
                            }
                        }
                    }
                }
            }
        }

        return newMoves
    }

    queenMoves(tab) {

        var newQueenMoves = []

        for (var i = 0; i <= 7; i++) {
            for (var j = 0; j <= 7; j++) {
                if (tab[i][j] === 'wq' || tab[i][j] === 'bq') {

                    if (tab[i - 1][j + 1] === 'e') {
                        newQueenMoves.push([i, j, i - 1, j + 1])
                    }

                    if (tab[i - 1][j - 1] === 'e') {
                        newQueenMoves.push([i, j, i - 1, j - 1])
                    }

                    if (tab[i + 1][j + 1] === 'e') {
                        newQueenMoves.push([i, j, i + 1, j + 1])
                    }

                    if (tab[i + 1][j - 1] === 'e') {
                        newQueenMoves.push([i, j, i + 1, j - 1])
                    }

                }
            }
        }

        return newQueenMoves
    }
}


module.exports = PossibleMovesController