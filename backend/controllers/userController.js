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

            console.log(user.tasks)
            res.json(user)
        } catch (error) {
            console.log(error)
        }
    },

    delete: async (req, res) => {
        try {

            const id = req.params.id

            const user = await UserModel.findById(id)

            if (!user) {
                res.status(404).json({ msg: "Usúario não encontrado" })
                return
            }

            const deleteUser = await UserModel.findByIdAndDelete(id)

            res
                .status(200)
                .json({ deleteUser, msg: "Usúario excluido com sucesso" })

        } catch (error) {
            console.log(error)
        }
    },

    update: async (req, res) => {
        try {

            const id = req.params.id
            let updatePatch = {};
           
            if (req.body.name) {
                updatePatch.name = req.body.name
            } 
            if (req.body.email) {
                updatePatch.email = req.body.email
            }
            if (req.body.password) {
                updatePatch.password = req.body.password
            }
            if (req.body.description) {
                updatePatch.description = req.body.description
            }

            const updateUser = await UserModel.findByIdAndUpdate(id, updatePatch)

            if (!updateUser) {
                res.status(404).json({ msg: "Usúario não encontrado" })
                return
            }

            res
                .status(200)
                .json({ updatePatch, msg: "Atualização feita com sucesso" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = userController 