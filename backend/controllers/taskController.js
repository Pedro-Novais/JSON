const { User: UserModel } = require('../models/user')
const { Task: TaskModel } = require('../models/tasks')

const taskController = {

    create: async (req, res) => {
        try {

            const id = req.userId

            const user = await UserModel.findById(id)

            if (!user) {
                res.status(404).json({ msg: "Usúario não encontrado" })
                return
            }
            let priorityTry = req.body.priority;
            if(priorityTry > 3) {
                priorityTry = 3
            }
            const newTask = {
                task: req.body.task,
                priority: priorityTry,
                userId: id
            }
            
            // Utilizando o método create para criar e salvar a nova tarefa
            const savedTask = await TaskModel.create(newTask);

            // Adicionando a referência da nova tarefa ao usuário
        
            user.tasks.push(savedTask._id);

            // Salvando o usuário novamente para atualizar o array de tarefas
            await user.save();

            res
                .status(201)
                .json({ savedTask, msg: "Task criada com sucesso" })

        } catch (error) {
            console.log(error)
        }
    },

    getAll: async (req, res) => {
        try {
            const id = req.userId

            const user = await UserModel.findById(id)

            if (!user) {
                res.status(404).json({ msg: "Usúario não encontrado" })
                return
            }

            const tasks = user.tasks
            let tasksFromUser = [];
        
            for(let i = 0; i < tasks.length; i++){

                tasksFromUser[i]= await TaskModel.findById(tasks[i])
    
            }

            res.json(tasksFromUser)

        } catch (error) {
            console.log(error)
        }
    },

    delete: async (req, res) =>{
        try {
            const id = req.userId
            const taskId = req.params.taskId

            const user = await UserModel.findById(id)

            if (!user) {
                res.status(404).json({ msg: "Usúario não encontrado" })
                return
            }

            const deleteTask = user.tasks

            for(let i = 0; i < deleteTask.length; i++){
                if(deleteTask[i] == taskId){
                    
                    user.tasks.splice(i, 1)
                    await TaskModel.findByIdAndDelete(taskId)

                    await user.save();
                }
            }

            res
                .status(200)
                .json({ taskId, msg: "Tarefa excluido com sucesso" })

        } catch (error) {
            console.log(error)
        }
    },

    update: async (req, res) =>{
        try {
            const id = req.userId
            const taskId = req.params.taskId
            const newTask = req.body.taskEdit

            const user = await UserModel.findById(id)

            if (!user) {
                res.status(404).json({ msg: "Usúario não encontrado" })
                return
            }

            const updateTask = await TaskModel.findByIdAndUpdate(taskId, newTask)

            if (!updateTask) {
                res.status(404).json({ msg: "Tarefa não encontrado" })
                return
            }

            res
                .status(200)
                .json({ newTask, msg: "Tarefa Alterada com sucesso" })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = taskController 