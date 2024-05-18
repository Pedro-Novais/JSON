import { BuilderTasks } from "./builderTasks.js"
import { PriorityActions, PriorityHover, get_priority } from "./utils/actions_priority.js"
import { modal_finish_cancel, modal_edit } from "../../utils/modals.js"
import { delete_req, put, get_json } from "../../utils/functionsReq.js"
import { get_token } from "../../utils/getToken.js"

const api_delete = 'api/user/tasks'
const api_update_statistic = 'api/user/statistic'
const api_edit_task = '/api/user/tasks'

export class BuilderModalsFromTask {

    finish_task(task) {

        this.create_modal_pattern('Finalizar', task)

    }

    cancel_task(task) {

        this.create_modal_pattern('Cancelar', task)
    }

    edit_task(task) {

        this.create_modal_edit(task)
    }

    create_modal_pattern(type, task) {

        const main = document.querySelector('main')

        const modal = document.createElement('div')

        modal.setAttribute('class', 'modal')
        modal.setAttribute('id', 'modal-remove')
        modal.innerHTML = modal_finish_cancel
        main.appendChild(modal)

        const title = document.querySelector('#title-determinate')
        title.innerHTML = `${type} Tarefa`

        const text_task = document.querySelector('#task-remove-text')
        text_task.innerHTML = task.task

        const priority = document.querySelectorAll('[level]')

        for (let i = 0; i < task.priority; i++) {

            priority[i].style.backgroundColor = "#05DBF2"

        }

        const btn_send = document.querySelector('#btn-edit-edit')
        const btn_cancel = document.querySelector('#btn-edit-cancel')

        btn_cancel.addEventListener('click', () => {

            this.remove_modal()

        })

        btn_send.addEventListener('click', () => {

            this.action_modal_pattern(task, type)

        })
    }

    async action_modal_pattern(task, type) {

        const token = get_token()
        const response = await delete_req(`${api_delete}/${task._id}`, token)

        if (!response.ok) {

            console.log('Algum erro ocorereu')
            return false
        }

        const url_priority = read_priority(task.priority)
        const type_operation = read_type(type)

        const data_update = {
            update: type_operation
        }

        const response_statistic = await put(`${api_update_statistic}/${url_priority}`, data_update, token)

        if (!response_statistic.ok) {

            console.log('Algum erro ocorereu')
            return false

        }

        this.remove_modal()

    }

    create_modal_edit(task) {

        const main = document.querySelector('main')

        const modal = document.createElement('div')

        modal.setAttribute('class', 'modal')
        modal.setAttribute('id', 'modal-edit')
        modal.innerHTML = modal_edit

        main.appendChild(modal)

        const name_task_edit = document.querySelector('#input-edit')
        name_task_edit.value = task.task
        
        this.insert_priority_from_task(task.priority)

        new PriorityActions("[piority-edit = 'True']")
        new PriorityHover("[piority-edit = 'True']")

        const btn_send = document.querySelector('#btn-edit-edit')
        const btn_cancel = document.querySelector('#btn-edit-cancel')

        btn_cancel.addEventListener('click', () => {

            this.remove_modal()

        })

        btn_send.addEventListener('click', () => {

            this.action_modal_edit(task)

        })
    }

    async action_modal_edit(task) {

        const contorn_div_edit = document.querySelector('#input-edit')

        const name_task_edit = document.querySelector('#input-edit').value
        const task_trim = name_task_edit.trim()

        if (name_task_edit == "" || name_task_edit == null || task_trim == "") {

            contorn_div_edit.style.boxShadow = 'rgba(216, 34, 18, 0.863) 0px 0px 0px 2px, rgba(228, 5, 5, 0.65) 0px 4px 6px -1px, rgba(153, 26, 26, 0.08) 0px 1px 0px inset'

            contorn_div_edit.addEventListener("click", () => {

                contorn_div_edit.style.boxShadow = "none"

            })

            return false
        }

        const priority_edit = get_priority("[piority-edit = 'True']")

        const data = {

            taskEdit: {
                task: name_task_edit,
                priority: priority_edit
            }
        }

        const token = get_token()

        const response = await put(`${api_edit_task}/${task._id}`, data, token)

        if (!response.ok) {

            console.log('Algum erro ocorreu ao editar a tarefa')

            return false
        }

        this.remove_modal()

    }

    insert_priority_from_task(priority){

        const element_priority = document.querySelectorAll(`[piority-edit = 'True']`)

        for (let i = 0; i < priority; i++) {

            element_priority[i].style.backgroundColor = '#05DBF2'
        }

        for(let i = 1; i < 4; i++){

            if(i == priority){

                element_priority[i-1].setAttribute('marked', 'True')
            }
        }

    }

    remove_modal() {

        const contorn_div_task = document.querySelector('#task-add')
        
        contorn_div_task.removeAttribute('class', 'watch-out')

        const modal = document.querySelector('.modal')

        modal.remove()

        const container = document.querySelector('#container')
        container.style.display = 'flex'

        new BuilderTasks()
    }
}

function read_type(type) {

    if (type == 'Finalizar') {

        return 'finished'
    }
    else if (type == 'Cancelar') {

        return 'canceled'
    }
}

export function read_priority(priority) {

    if (priority == 1) {

        return 'priorityOne'
    }
    else if (priority == 2) {

        return 'priorityTwo'
    }
    else if (priority == 3) {

        return 'priorityThree'

    }
}