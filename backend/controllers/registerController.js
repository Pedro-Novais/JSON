const { User: UserModel } = require('../models/user')
const { ConfirmationUser } = require('../models/confirmation') 

const bcrypt = require('bcrypt');
require('dotenv').config()
const jwt = require('jsonwebtoken')

const { send } = require('./utils/sendEmail')

const registerController = {

    create: async (req, res) => {
        try {

            const email = req.body.email
    
            const existingUser = await UserModel.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ msg: 'E-mail já registrado' });
            }

            // Gere um salt (fator de aleatoriedade) para o bcrypt
            const salt = await bcrypt.genSalt(10);

            // Hash da senha antes de salvar
            const password = await bcrypt.hash(req.body.password, salt);

            const statisticDefault = {
                priorityOne: {
                    created: 0,
                    finished: 0,
                    canceled: 0
                },
                priorityTwo: {
                    created: 0,
                    finished: 0,
                    canceled: 0
                },
                priorityThree: {
                    created: 0,
                    finished: 0,
                    canceled: 0
                }
            }

            const persistStatisticDefault = {
                created: 0,
                finished: 0,
                canceled: 0
            }

            const configurations = {
                orderPriority: false,
                usersCanViewStatistic: false
            }

            const newUser = {
                name: req.body.name,
                email: email,
                password: password,
                description: " ",
                ranking: " - ",
                configurations: configurations,
                statistic: statisticDefault,
                persistStatistic: persistStatisticDefault
            }

            const response = await UserModel.create(newUser)

            const secret = process.env.SECRET

            const token = jwt.sign(
                {
                    id: response._id
                },
                secret
            )

            res
                .status(201)
                .json({ token, msg: "Usúario criado com sucesso" })

        } catch (error) {
            console.log(error)
        }
    },

    createCode: async (req, res) => { 
        try{

            const email = req.body.email
    
            const existingUser = await UserModel.findOne({ email });
            const existingUserConfirmation = await ConfirmationUser.findOne({ email });

            if (existingUser) {

                return res
                        .status(409)
                        .json({ msg: 'E-mail já registrado' });
            }

            // Gere um código de confirmação (pode ser gerado aleatoriamente)
            const code = Math.floor(100000 + Math.random() * 900000);

            if(existingUserConfirmation){

                existingUserConfirmation.code  = code

                existingUserConfirmation.save()

                send(code, req)

                return res
                        .status(201)
                        .json({msg: "Código de confirmação criado com sucesso" })
            }
    
            send(code, req)
    
            const dataConfirmation = {
                email: req.body.email,
                code: code
            }
            
            const response = await ConfirmationUser.create(dataConfirmation)

            res
                .status(201)
                .json({ code: code, msg: "Código de confirmação criado com sucesso" })

        }catch(error){
            console.log(error)
        }
    },

    verifyCode: async (req, res) =>{
        try {

            const email = req.body.email
            const code = req.body.code
            
            const user = await ConfirmationUser.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: 'E-mail não encontrado' });
            }

            if(user.code !== code){
                return res.status(401).json({ msg: 'Código de confirmação incorreto!' });
            }

            const response = await ConfirmationUser.deleteOne({ email })

            res
                .status(201)
                .json({ response, msg: "Código de confirmação excluido com sucesso" })

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = registerController