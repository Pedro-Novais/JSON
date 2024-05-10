import { modal_finish_cancel, modal_edit } from "../utils/modals.js"

export class BuilderModalsFromTask{

    finish_task(task){

        this.create_modal_pattern('Finalizar', task)
        console.log('finalizar', task)

    }

    cancel_task(task){

        this.create_modal_pattern('Cancelar', task)
    }

    edit_task(task){
        console.log('editar', task)
    }

    create_modal_pattern(type, task){

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

            const container = document.querySelector('#container')

            modal.remove()
            container.style.display = 'flex'
        })

        this.action_modal_pattern(task)
    }

    create_modal_edit(task){

    }

    action_modal_pattern(task){

        console.log(task)
  
    }
    
    action_modal_edit(){

    }
}