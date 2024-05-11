import { BuilderTasks } from "./builderTasks.js"
import { verifyUser } from "../utils/verificationUser.js"
import { alertAddTask } from "../utils/modals.js"
import { get } from "../utils/functionsReq.js"
import { get_token } from "../utils/getToken.js"
import { mark_header } from "../utils/markHeader.js"

const api = 'api/user/tasks'

class InteractorList {

    constructor() {

        mark_header('list')
        this.get_data()

    }

    async get_data() {

        const token = get_token()
        const response = await get(api, token, 1)

        if (!response.ok) {

            console.log('Ocorreu algum erro ao carregar sua tarefas')
            return false

        }

        const tasks = response.responseData.tasks

        this.verify_tasks(tasks)

    }

    verify_tasks(tasks) {

        if (tasks.lenght == 0) {

            this.alert_insert_task("without-task")

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