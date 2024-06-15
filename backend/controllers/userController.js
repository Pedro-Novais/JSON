const { User: UserModel } = require('../models/user')
const { Task: TaskModel } = require('../models/tasks')
const bcrypt = require('bcrypt');

const userController = {

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
            const id = req.userId

            const user = await UserModel.findById(id).select('-_id -statistic -tasks -updatedAt -__v -configurations')

            if (!user) {
                res.status(404).json({ msg: "Usúario não encontrado" })
                return
            }

            res.status(201).json(user)
        } catch (error) {
            console.log(error)
        }
    },

    get_infos_personalization: async (req, res) => {
        try {

            const id = req.userId

            const user = await UserModel.findById(id).select('-_id name description email socialMidias')

            if (!user) {
                res.status(404).json({ msg: 'Úsario não encontrado' })
            }

            user.password = '**********'
            res.status(201).json(user)

        } catch (error) {
            console.log(error)
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.userId

            const user = await UserModel.findById(id)

            if (!user) {
                res.status(404).json({ msg: "Usúario não encontrado" })
                return
            }

            const taskToDelete = user.tasks

            if (taskToDelete.length > 0) {
                for (let i = 0; i < taskToDelete.length; i++) {

                    await TaskModel.findByIdAndDelete(taskToDelete[i])

                }

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

            const id = req.userId
            let updatePatch = {};

            if (req.body.name) {
                updatePatch.name = req.body.name
            }
            if (req.body.email) {
                updatePatch.email = req.body.email
            }
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);

                const password = await bcrypt.hash(req.body.password, salt);

                updatePatch.password = password
            }
            if (req.body.description) {
                updatePatch.description = req.body.description
            }
            if (req.body.socialMidia) {
                const user = await UserModel.findById(id)

                user.socialMidias[req.body.socialMidia] = req.body.update
                console.log(user.socialMidias)

                try {

                    user.save()

                    res
                        .status(200)
                        .json({ updatePatch, msg: "Atualização feita com sucesso" })

                } catch(error){

                    console.log(error)
                }

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
    },

    verifyPassword: async (req, res) => {
        try {
            const id = req.userId
            const password = req.body.password

            const user = await UserModel.findById(id).select('+password')


            if (!user) {

                return res.status(404).json({ msg: "Úsuario não encontrado" })
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {

                return res.status(401).json({ msg: "Senha atual está incorreta!" })

            }

            res
                .status(200)
                .json({ msg: "Senha inserida corretamente" })


        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = userController 