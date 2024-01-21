const {Task: TaskModel} = require('../models/tasks')

const taskController = {

    create: async (req, res) =>{
        try {
            console.log(req.body)
            const newTask = {
                task: req.body.task,
                priority: req.body.priority
            }

            const response = await TaskModel.create(newTask)

            res
                .status(201)
                .json({response, msg: "Task criada com sucesso"})
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = taskController 