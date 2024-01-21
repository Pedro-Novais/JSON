const { User: UserModel } = require('../models/user')

const userController = {

    create: async (req, res) => {
        try {
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const response = await UserModel.create(newUser)

            res
                .status(201)
                .json({ response, msg: "Usúario criado com sucesso" })

        } catch (error) {
            console.log(error)
        }
    },

    getAll: async (req, res) => {
        try {

            const users = await UserModel.find();

            res.json(users)
        } catch (error) {
            console.log(error)
        }
    },

    get: async (req, res) => {
        try {

            const id = req.params.id;

            const user = await UserModel.findById(id)

            if (!user) {
                res.status(404).json({ msg: "Usúario não encontrado" })
                return
            }

            res.json(user)
        } catch (error) {
            console.log(error)
        }
    },

    delete: async (req, res) => {
        try {

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = userController 