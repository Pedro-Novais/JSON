import { BuilderTasks } from "./builderTasks.js"
import { post, put } from "../../utils/functionsReq.js"
import { get_token } from "../../utils/getToken.js"
import { get_priority } from "./utils/actions_priority.js"
import { read_priority } from "./builderModals.js"
import { API } from "../../utils/endPoints.js"

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

        this.insert_new_task(data, contorn_div_task, priority_task)
    }

    async insert_new_task(data, insert, priority){

        const token = get_token()

        const response = await post(API.url_get_task, data, token)

        if(!response.ok){

            console.log('Erro ao criar tarefa')

            return false
        }

        this.update_statistic(priority)

        insert.value = ""
        new BuilderTasks()
    }

    async update_statistic(priority){

        const data_update = {
            update: 'created'
        }

        const url_priority = read_priority(priority)

        const token = get_token()
        const response_statistic = await put(`${API.url_statistic}/${url_priority}`, data_update, token)

        if(!response_statistic.ok){

            console.log('ocorreu um erro ao atualizar suas estatísticas de created')

            return false
        }
   
        return true
    }
}