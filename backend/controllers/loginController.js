const { User: UserModel } = require('../models/user')
const { ConfirmationUser } = require('../models/confirmation')

require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginController = {

    login: async (req, res) => {
        try {
            const email = req.body.email
            const password = req.body.password

            const user = await UserModel.findOne({ email }).select('+password');

            if (!user) {
                return res.status(401).json({ msg: 'Email e/ou senha inseridos estão incorretos!' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ msg: 'Email e/ou senha inseridos estão incorretos!' });
            }

            const secret = process.env.SECRET

            const token = jwt.sign(
                {
                    id: user._id
                },
                secret
            )

            res.status(200).json({ token: token, msg: 'Login bem-sucedido' });

        } catch (error) {
            console.log(error)
        }
    },

    
    recallCode: async (req, res) => {
        try {

            const code = req.body.identifier

            const code_verify = await ConfirmationUser.find({ code: code });
    
            if (code_verify.length == 0) {

                return res.status(400).json({ msg: 'Código de validação inexistente' })
            }

            res.status(200).json({msg: 'Autorização ok', email: code_verify[0].email})

        } catch (error) {
            console.log(error)
        }
    },

    verifyChangePassword: async (req, res) => {
        try {
            
            const email = req.body.email
            const password = req.body.password

            const user = await UserModel.findOne({email: email})

            if(!user){
                return res.status(400).json({ msg: 'Erro ao realizar a redefinição' })
            }

            const salt = await bcrypt.genSalt(10);

            const password_encripty = await bcrypt.hash(password, salt);

            user.password = password_encripty

            user.save()

            res.status(200).json({msg: 'Senha alterada com sucesso!'})

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = loginController