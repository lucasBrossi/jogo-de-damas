class PossibleMovesController {
    constructor(PLAYER_TURN) {
        this.PLAYER_TURN = PLAYER_TURN
    }

    nextMoves(tab) {

        let newMoves = []

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
            var newPositions3 = this.captureMove(tab, newPositions2, 4)
            
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
                    newMoves.forEach(element => {
                        
                        if (element[num]) {
                            if (!((tab[parseInt(element[num][2]) - 1])===undefined) && tab[parseInt(element[num][2]) - 1][parseInt(element[num][3]) + 1] === 'b'||tab[parseInt(element[num][2]) - 1][parseInt(element[num][3]) + 1] === 'bq') {
                                if (!((tab[parseInt(element[num][2]) - 2])===undefined) && tab[parseInt(element[num][2]) - 2][parseInt(element[num][3]) + 2] === 'e') {
                                    element.push([parseInt(element[num][2]), parseInt(element[num][3]), parseInt(element[num][2]) - 2, parseInt(element[num][3]) + 2])

                                }
                            }

                            if (!((tab[parseInt(element[num][2]) - 1])===undefined) && tab[parseInt(element[num][2]) - 1][parseInt(element[num][3]) - 1] === 'b'||tab[parseInt(element[num][2]) - 1][parseInt(element[num][3]) - 1] === 'bq') {
                                if (!((tab[parseInt(element[num][2]) - 2])===undefined) && tab[parseInt(element[num][2]) - 2][parseInt(element[num][3]) - 2] === 'e') {
                                    element.push([parseInt(element[num][2]), parseInt(element[num][3]), parseInt(element[num][2]) - 2, parseInt(element[num][3]) - 2])
                                }
                            }
                        } 
                    })
                } else {
                    newMoves.forEach(element => {
                        
                        if (element[num]) {
                            if (!((tab[parseInt(element[num][2]) + 1])===undefined) && tab[parseInt(element[num][2]) + 1][parseInt(element[num][3]) + 1] === 'w'||tab[parseInt(element[num][2]) + 1][parseInt(element[num][3]) + 1] === 'wq') {
                                if (!((tab[parseInt(element[num][2]) + 2])===undefined) && tab[parseInt(element[num][2]) + 2][parseInt(element[num][3]) + 2] === 'e') {
                                    element.push([parseInt(element[num][2]), parseInt(element[num][3]), parseInt(element[num][2]) + 2, parseInt(element[num][3]) + 2])

                                }
                            }

                            if (!((tab[parseInt(element[num][2]) + 1])===undefined) && tab[parseInt(element[num][2]) + 1][parseInt(element[num][3]) - 1] === 'w'||tab[parseInt(element[num][2]) + 1][parseInt(element[num][3]) - 1] === 'wq') {
                                if (!((tab[parseInt(element[num][2]) + 2])===undefined) && tab[parseInt(element[num][2]) + 2][parseInt(element[num][3]) - 2] === 'e') {
                                    element.push([parseInt(element[num][2]), parseInt(element[num][3]), parseInt(element[num][2]) + 2, parseInt(element[num][3]) - 2])
                                }
                            }
                        } 
                    })
                    
                }
            } else {
                if (this.PLAYER_TURN === "player1") {
                    newMoves.forEach(element => {


                        if (!((tab[parseInt(element[2]) - 1])===undefined) && tab[parseInt(element[2]) - 1][parseInt(element[3]) + 1] === 'b'||tab[parseInt(element[2]) - 1][parseInt(element[3]) + 1] === 'bq') {
                            if (!((tab[parseInt(element[2]) - 2])===undefined) && tab[parseInt(element[2]) - 2][parseInt(element[3]) + 2] === 'e') {
                                element.push([parseInt(element[2]), parseInt(element[3]), parseInt(element[2]) - 2, parseInt(element[3]) + 2])
                            }
                        }

                        if (!((tab[parseInt(element[2]) - 1])===undefined) && tab[parseInt(element[2]) - 1][parseInt(element[3]) - 1] === 'b'||tab[parseInt(element[2]) - 1][parseInt(element[3]) - 1] === 'b') {
                            if (!((tab[parseInt(element[2]) - 2])===undefined) && tab[parseInt(element[2]) - 2][parseInt(element[3]) - 2] === 'e') {
                                element.push([parseInt(element[2]), parseInt(element[3]), parseInt(element[2]) - 2, parseInt(element[3]) - 2])
                            }
                        }
                    })
                } else {
                    newMoves.forEach(element => {


                        if (!((tab[parseInt(element[2]) + 1])===undefined) && tab[parseInt(element[2]) + 1][parseInt(element[3]) + 1] === 'b'||tab[parseInt(element[2]) + 1][parseInt(element[3]) + 1] === 'bq') {
                            if (!((tab[parseInt(element[2]) + 2])===undefined) && tab[parseInt(element[2]) + 2][parseInt(element[3]) + 2] === 'e') {
                                element.push([parseInt(element[2]), parseInt(element[3]), parseInt(element[2]) + 2, parseInt(element[3]) + 2])
                            }
                        }

                        if (!((tab[parseInt(element[2]) + 1])===undefined) && tab[parseInt(element[2]) + 1][parseInt(element[3]) - 1] === 'b'||tab[parseInt(element[2]) + 1][parseInt(element[3]) - 1] === 'b') {
                            if (!((tab[parseInt(element[2]) + 2])===undefined) && tab[parseInt(element[2]) + 2][parseInt(element[3]) - 2] === 'e') {
                                element.push([parseInt(element[2]), parseInt(element[3]), parseInt(element[2]) + 2, parseInt(element[3]) - 2])
                            }
                        }
                    })
                }
            }
        } else {
            if (this.PLAYER_TURN === "player1") {
                for (var i = 0; i <= 7; i++) {
                    for (var j = 0; j <= 7; j++) {
                        if (tab[i][j] === 'w'||tab[i][j] === 'wq') {

                            if (tab[i - 1][j + 1] === 'b'||tab[i - 1][j + 1] === 'bq') {
                                if (tab[i - 2][j + 2] === 'e') {
                                    newMoves.push([i, j, i - 2, j + 2])
                                }
                            }

                            if (tab[i - 1][j - 1] === 'b'||tab[i - 1][j - 1] === 'bq') {
                                if (tab[i - 2][j - 2] === 'e') {
                                    newMoves.push([i, j, i - 2, j - 2])
                                }
                            }
                        }
                    }
                }
            } else {
                for (var i = 0; i <= 7; i++) {
                    for (var j = 0; j <= 7; j++) {
                        if (tab[i][j] === 'b'||tab[i][j] === 'bq') {

                            if (tab[i + 1][j + 1] === 'w'||tab[i + 1][j + 1] === 'wq') {
                                if (tab[i + 2][j + 2] === 'e') {
                                    newMoves.push([i, j, i + 2, j + 2])
                                }
                            }

                            if (tab[i + 1][j - 1] === 'w'||tab[i + 1][j - 1] === 'wq') {
                                if (tab[i + 2][j - 2] === 'e') {
                                    newMoves.push([i, j, i + 2, j - 2])
                                }
                            }
                        }
                    }
                }
            }
        }

        return newMoves
    }
}

module.exports = PossibleMovesController