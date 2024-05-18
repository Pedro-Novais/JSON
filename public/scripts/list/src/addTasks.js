import { BuilderTasks } from "./builderTasks.js"
import { convert_id_to_integer } from "./utils/priority_integer.js"
import { post } from "../../utils/functionsReq.js"
import { get_token } from "../../utils/getToken.js"
import { get_priority } from "./utils/actions_priority.js"

const apiTask = '/api/user/tasks'

export class AddTask {

    constructor() {

        const btn = document.querySelector('#btn-add')
        btn.addEventListener('click', this.add_task.bind(this))
    }

    add_task() {

        const contorn_div_task = document.querySelector('#task-add')

        const name_task = document.querySelector('#task-add').value
        const task_trim = name_task.trim()

        if (name_task === "" || name_task === null || task_trim === "") {

            contorn_div_task.setAttribute('class', 'watch-out')

            contorn_div_task.addEventListener('click', () => {

                contorn_div_task.removeAttribute('class', 'watch-out')

            })

            return false
        }

        const priority_task = get_priority('.choose-priority')

        const data = {
            task: name_task,
            priority: priority_task
        }

        this.insert_new_task(data, contorn_div_task)
    }

    async insert_new_task(data, insert){

        const token = get_token()

        const response = await post(apiTask, data, token)

        if(!response.ok){

            console.log('Erro ao criar tarefa')

            return false
        }

        insert.value = ""
        new BuilderTasks()
    }
}