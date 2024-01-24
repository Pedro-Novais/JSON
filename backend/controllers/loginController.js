const { User: UserModel } = require('../models/user')
const bcrypt = require('bcrypt');

const loginController = {

    login: async (req, res) => {
        try {
            const email = req.body.email
            const password = req.body.password

            // Verifique se o usuário existe
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(401).json({ msg: 'Credenciais inválidas' });
            }

            // Verifique se a senha é correta usando o método comparePassword
            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return res.status(401).json({ msg: 'Credenciais inválidas' });
            }

            res.status(200).json({ msg: 'Login bem-sucedido' });
            
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = loginController