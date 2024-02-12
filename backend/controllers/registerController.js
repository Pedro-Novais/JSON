const { User: UserModel } = require('../models/user')
const bcrypt = require('bcrypt');

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
                taskCreated: 0,
                taskFinished: 0,
                taskCanceled: 0
            }

            const configurations = {
                orderPriority: false,
                usersCanViewStatistic: false
            }

            const newUser = {
                name: req.body.name,
                email: email,
                password: password,
                configurations: configurations,
                statistic: statisticDefault,
                persistStatistic: persistStatisticDefault
            }

            const response = await UserModel.create(newUser)

            response.password = undefined

            res
                .status(201)
                .json({ response, msg: "Usúario criado com sucesso" })

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = registerController