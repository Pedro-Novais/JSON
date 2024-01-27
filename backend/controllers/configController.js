const { User: UserModel } = require('../models/user')
const { Config: ConfigModel } = require('../models/config')

const configController = {
    /*create: async (req, res) => {
        try {
            const userId = req.params.userId

            const user = await UserModel.findById(userId)

            if (!user) {
                res.status(404).json({ msg: "Usúario não encontrado" })
                return
            }

            const newConfig = {
                orderPriority: req.body.orderPriority,
                usersCanViewStatistic: req.body.usersCanViewStatistic
            }

            const savedConfig = await ConfigModel.create(newConfig);

            // Adicionando a referência da nova tarefa ao usuário

            user.configurations.push(savedConfig._id);

            await user.save();

            res
                .status(201)
                .json({ savedConfig, msg: "Configuração criada com sucesso" })

        } catch (error) {
            console.log(error)
        }
    },*/

    getAll: async (req, res) => {
        try {
            const id = req.userId

            const user = await UserModel.findById(id)

            if (!user) {
                res.status(404).json({ msg: "Usúario não encontrado" })
                return
            }

            const config = user.configurations

            res.json(config)

        } catch (error) {
            console.log(error)
        }
    },

    update: async (req, res) => {
        try {
            const id = req.userId

            const user = await UserModel.findById(id)

            if (!user) {
                res.status(404).json({ msg: "Usúario não encontrado" })
                return
            }

            const newConfig = {
                orderPriority: req.body.orderPriority,
                usersCanViewStatistic: req.body.usersCanViewStatistic
            }

            user.configurations = newConfig

            await user.save();

            res
                .status(200)
                .json({ newConfig, msg: "Configuração alterada com sucesso" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = configController