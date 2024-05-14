import { BuilderTasks } from "./builderTasks.js"
import { AddTask } from "./addTasks.js"
import { AddPriority } from "./addPriority.js"
import { verifyUser } from "../utils/verificationUser.js"
import { alertAddTask } from "../utils/modals.js"
import { get_json } from "../utils/functionsReq.js"
import { get_token } from "../utils/getToken.js"
import { mark_header } from "../utils/markHeader.js"

const api = 'api/user/tasks'

export class InteractorList {

    constructor() {

        new AddTask()
        new AddPriority()

        mark_header('list')
        this.get_data()

    }

    async get_data() {

        const token = get_token()
        const response = await get_json(api, token)

        if (!response.ok) {

            console.log('Ocorreu algum erro ao carregar sua tarefas')
            return false

        }

        const tasks = response.responseData.tasks

        this.verify_tasks(tasks)

    }

    verify_tasks(tasks) {
    
        if (tasks.length == 0) {

            const container = document.querySelector('#task-made')
            container.innerHTML = alertAddTask

        } else {

            new BuilderTasks(tasks)

        }
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