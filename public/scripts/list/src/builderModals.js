import { BuilderTasks } from "./builderTasks.js"
import { modal_finish_cancel, modal_edit } from "../../utils/modals.js"
import { delete_req, put, get_json } from "../../utils/functionsReq.js"
import { get_token } from "../../utils/getToken.js"

const api_delete = 'api/user/tasks'
const api_update_statistic = 'api/user/statistic'

export class BuilderModalsFromTask{

    finish_task(task){

        this.create_modal_pattern('Finalizar', task)

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

        btn_send.addEventListener('click', () =>{

            this.action_modal_pattern(task, type)

        })
    }

    async action_modal_pattern(task, type){

        const token = get_token()
        const response = await delete_req(`${api_delete}/${task._id}`, token)

        if(!response.ok){

            console.log('Algum erro ocorereu')
            return false
        }

        const url_priority = read_priority(task.priority)
        const type_operation = read_type(type)

        const data_update = {
            update: type_operation
        }

        const response_statistic = await put(`${api_update_statistic}/${url_priority}`, data_update, token)

        if(!response_statistic.ok){
            
            console.log('Algum erro ocorereu')
            return false

        }

        this.remove_modal()
  
    }

    create_modal_edit(task){
        
        
    }
    
    action_modal_edit(){

    }

    async remove_modal(){
 
        const modal = document.querySelector('.modal')
        
        modal.remove()

        const container = document.querySelector('#container')
        container.style.display = 'flex'

        new BuilderTasks() 
    }
}

function read_type(type){

    if(type == 'Finalizar'){
        
        return 'finished'
    }
    else if(type == 'Cancelar'){

        return 'canceled'
    }
}

function read_priority(priority){

    if(priority == 1){

        return 'priorityOne'
    }
    else if(priority == 2){

        return 'priorityTwo'
    }
    else if (priority == 3){

        return 'priorityThree'

    }
}