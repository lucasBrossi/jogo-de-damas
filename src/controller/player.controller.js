const Database = require('../service')

class PlayerController {
    async updateGame(id, idPlayer2) {

        const sets = {
            idPlayer2: idPlayer2
        }
        const responseUpdate = await new Database('src/db/games.json').update(id, sets)
        console.log(responseUpdate)

        return responseUpdate

    }

}

module.exports = PlayerController