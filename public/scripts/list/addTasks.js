import { AddPriority } from "./addPriority.js"

export class AddTask {

    constructor() {

        const btn = document.querySelector('#btn-add')
        btn.addEventListener('click', this.add_task)
    }

    add_task() {

        const contorn_div_task = document.querySelector('#task-add')

        const value_task = document.querySelector('#task-add').value
        const task_trim = value_task.trim()

        if (value_task === "" || value_task === null || task_trim === "") {

            contorn_div_task.setAttribute('class', 'watch-out')

            contorn_div_task.addEventListener('click', () => {

                contorn_div_task.removeAttribute('class', 'watch-out')

            })

            return false
        }
    }
}