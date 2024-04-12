const { User: UserModel } = require('../models/user')
const { Task: TaskModel } = require('../models/tasks')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')

const userController = {

    /*create: async (req, res) => {
        try {
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

            const configurations = {
                orderPriority: false,
                usersCanViewStatistic: false
            }

            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                statistic: statisticDefault,
                configurations: configurations
            }

            const response = await UserModel.create(newUser)

            res
                .status(201)
                .json({ response, msg: "Usúario criado com sucesso" })

        } catch (error) {
            console.log(error)
        }
    },*/

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

            const user = await UserModel.findById(id).select('-_id')

            if (!user) {
                res.status(404).json({ msg: "Usúario não encontrado" })
                return
            }

            //return res.status(404).json({ msg: "Usúario não encontrado" })

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
            
            
            if(!user){
                
                return res.status(404).json({msg: "Úsuario não encontrado"})
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if(!isPasswordValid){
                
                return res.status(404).json({msg: "A senha inserida está incorreta"})

            }

            res
                .status(200)
                .json({msg: "Senha inserida corretamente"})


        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = userController 