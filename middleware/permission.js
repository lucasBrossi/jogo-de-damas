const jwt = require('jsonwebtoken')

class Allow {
    qualification(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, 'playGame')
            req.player = decode

            next()
        } catch (error) {
            return res.status(401).send({ mensagem: "Nao autorizado" })   
        }
    }
}

module.exports = Allow