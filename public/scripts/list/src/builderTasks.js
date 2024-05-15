import { BuilderModalsFromTask } from "./builderModals.js"
import { get_json } from "../../utils/functionsReq.js"
import { get_token } from "../../utils/getToken.js"
import { alertAddTask } from "../../utils/modals.js"
import { remove_task } from "./utils/remove_tasks.js"
import { reset_priority } from "./utils/reset_priority.js"

const api = 'api/user/tasks'

export class BuilderTasks {

    constructor() {

        reset_priority()
        remove_task()
        
        this.get_tasks()

    }

    async get_tasks() {

        const token = get_token()
        const response = await get_json(api, token)

        if (!response.ok) {

            console.log('Algum erro ocorreu ao realizar a requisição das tasks')

            return false
        }

        const tasks = response.responseData.tasks

        if (tasks.length == 0) {

            const container = document.querySelector('#task-made')
            container.innerHTML = alertAddTask

        } else {

            const alert = document.querySelector('.box-info-add-task')

            if (alert) {

                alert.remove()
            }

            this.building_task(tasks)
        }
    }

    building_task(tasks) {

        const container = document.querySelector('#task-made')

        for (let i = 0; i < tasks.length; i++) {

            const div = document.createElement('div')
            div.setAttribute('class', 'tasks')

            const container_priority_action = document.createElement('div')
            container_priority_action.setAttribute('class', 'priority-action')

            this.create_name_task(tasks[i].task, div)
            this.create_priority_task(tasks[i].priority, div, container_priority_action)
            this.create_actions_icons_task(tasks[i], div, container_priority_action)

            container.appendChild(div)
        }
    }

    create_name_task(name, div) {

        const name_element = document.createElement('p')
        name_element.setAttribute('class', 'task-puted')
        name_element.innerHTML = name

        div.appendChild(name_element)

    }

    create_priority_task(priority, div, container) {

        const container_priority = document.createElement('div')
        container_priority.setAttribute('class', 'priority-task')

        let level = []

        for (let i = 0; i < 3; i++) {

            level[i] = document.createElement('div')
            level[i].setAttribute('class', 'priority-level')

            container_priority.appendChild(level[i])
            container.appendChild(container_priority)
        }

        for (let i = 0; i < priority; i++) {

            level[i].style.backgroundColor = '#05DBF2';

        }

        div.appendChild(container)

    }

    create_actions_icons_task(task, div, container) {

        const container_action = document.createElement('div')
        container_action.setAttribute('class', 'container-actions')

        const icon_finish = document.createElement('img')
        const icon_del = document.createElement('img')
        const icon_edit = document.createElement('img')

        icon_finish.setAttribute('src', './svg/check-solid.svg')
        icon_del.setAttribute('src', './svg/xmark-solid.svg')
        icon_edit.setAttribute('src', './svg/pencil-solid.svg')

        icon_finish.setAttribute('class', 'actions')
        icon_del.setAttribute('class', 'actions')
        icon_edit.setAttribute('class', 'actions')

        container_action.appendChild(icon_finish)
        container_action.appendChild(icon_del)
        container_action.appendChild(icon_edit)

        container.appendChild(container_action)

        div.appendChild(container)

        this.actions_icons(
            icon_finish,
            icon_del,
            icon_edit,
            task
        )
    }

    actions_icons(finish, del, edit, task) {

        const container = document.querySelector('#container')

        finish.addEventListener('click', () => {

            container.style.display = 'none'
            new BuilderModalsFromTask().finish_task(task)

        })

        del.addEventListener('click', () => {

            container.style.display = 'none'
            new BuilderModalsFromTask().cancel_task(task)

        })

        edit.addEventListener('click', () => {

            container.style.display = 'none'
            new BuilderModalsFromTask().edit_task(task)

        })
    }
}