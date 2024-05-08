require('dotenv').config()
const jwt = require('jsonwebtoken')

function checkToken(req, res, next) {
    try {
        
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]

        if (!token) {

            return res.status(401).json({ msg: "Acesso negado" })
        }

        const decodedToken = jwt.decode(token, { complete: true });

        if (!decodedToken) {

            return res.status(401).json({ msg: "Token inválido" });
        }

        const secret = process.env.secret

        const decodedTokenId = jwt.verify(token, secret);

        const id = decodedTokenId.id;

        req.userId = id;

        jwt.verify(token, secret)

        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = { checkToken }