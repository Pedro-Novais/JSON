import { BuilderTasks } from "./builderTasks.js"
import { verifyUser } from "../utils/verificationUser.js"
import { alertAddTask } from "../utils/modals.js"
import { get } from "../utils/functionsReq.js"

const api = 'api/user/tasks'
class InteractorList {

    constructor() {

        this.get_data()

    }

    async get_data() {

        const token = localStorage.getItem('token')
        const response = await get(api, token, 1)

        if (!response.ok) {

            console.log('Ocorreu algum erro ao carregar sua tarefas')
            return false

        }

        const tasks = response.responseData.tasksFromUser
        const config = response.responseData.config

        this.verify_tasks(tasks, config)

    }

    verify_tasks(tasks, config) {
        if (tasks.lenght == 0) {

            this.alert_insert_task("without-task")

        } else {

            if (config == false) {

                new BuilderTasks(tasks)

            } else {

                const tasksOrganize = this.organize_tasks_in_order(tasks)

                new BuilderTasks(tasksOrganize)
            }
        }
    }

    organize_tasks_in_order(tasks) {

        let tasksOrganize = []
        let state = 3;

        for (let i = 0; i <= tasks.length; i++) {

            if (i == tasks.length) {

                i = 0;
                state = state - 1
            }

            if (state == 0) {

                break
            }

            if (tasks[i].priority == state) {

                tasksOrganize.push(tasks[i])

            }
        }

        return tasksOrganize
    }

    alert_insert_task(type) {

        const container = document.querySelector('#task-made')

        if (type == "without-task") {

            container.innerHTML = alertAddTask

        }
        else if (type == "finished-all-tasks") {

            const alert = document.querySelector('.box-info-add-task')

            alert.remove()
        }
    }
}

new InteractorList()