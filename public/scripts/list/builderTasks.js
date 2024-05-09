export class BuilderTasks {

    constructor(tasks) {

        console.log(tasks)

        for (let i = 0; i < tasks.lenght; i++) {

            const container = document.querySelector('#task-made')

            const div = document.createElement('div')
            div.setAttribute('class', 'tasks')

            this.create_name_task(tasks[i].name, div)
        }
    }

    create_name_task(name, div) {
        
    }

    create_priority_task() {

    }

    create_actions_task() {

    }
}