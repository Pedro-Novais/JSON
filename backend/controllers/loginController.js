const { User: UserModel } = require('../models/user')

require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const loginController = {

    login: async (req, res) => {
        try {
            const email = req.body.email
            const password = req.body.password

            const user = await UserModel.findOne({ email }).select('+password');

            if (!user) {
                return res.status(404).json({ msg: 'Credenciais inválidas' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
     
            if (!isPasswordValid) {
                return res.status(401).json({ msg: 'Credenciais inválidas' });
            }

            const secret = process.env.SECRET

            const token = jwt.sign(
                {
                    id: user._id
                },
                secret
            )

            const userLoged = user._id
            
            res.status(200).json({ token, userLoged, msg: 'Login bem-sucedido' });
            
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = loginController