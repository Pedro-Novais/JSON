import { MODAL } from "./utils/modal.js";
import { formatedDate } from "../../utils/general.js";

export class ViewProfileFromUser{

    constructor(user){
    
        this.create_base_view(user)
        
    }

    create_base_view(user){
        
        const main = document.querySelector('main')

        const ranking = document.querySelector('#container-ranking')
        ranking.style.display = 'none'

        const div = document.createElement('div')
        div.setAttribute('id', 'container-view-profile')
        div.innerHTML = MODAL.profile

        main.appendChild(div)

        this.btn_action()
        this.insert_infos(user.user)
    }

    insert_infos(user){

        const element = [
            document.querySelector('#other-view-name'),
            document.querySelector('#other-info-since'),
            document.querySelector('#other-info-ranking'),
            document.querySelector('#other-info-connections'),
            document.querySelector('#other-info-task-created'),
            document.querySelector('#other-info-task-finished'),
            document.querySelector('#other-info-task-canceled'),
            document.querySelector('#other-text-user-description'),
        ]

        const date = formatedDate(user.date)
        const ranking = parseInt(user.position)
        let description = user.description;

        if(description == " "){
            description = "Nenhuma descrição foi adicionada"
        }

        const values = [
            user.name,
            date,
            `${ranking}º`,
            '-',
            user.taskCreated,
            user.taskFinished,
            user.taskCanceled,
            description,
        ]

        for(let i = 0; i < element.length; i++){

            element[i].innerHTML = values[i]

        }

        if(user.socialMidias){

            this.builder_social_midias(user.socialMidias)
        }
    }

    builder_social_midias(midias){
        
        const midias_elements = ['instagram', 'facebook', 'linkedin', 'twitter']

        midias_elements.forEach(element => {

            if(midias[element].state){

                const data = midias[element]
                
                const line_element = document.querySelector(`[midia = ${element}]`)
                const text_element = document.querySelector(`#user-${element}`)
                
                text_element.innerHTML = data.nameSocialMidia
                
                if(data.urlSocialMidia !== ""){

                    line_element.setAttribute('href', data.urlSocialMidia)
                    line_element.setAttribute('target', '_blank')
                    line_element.setAttribute('rel', 'noopener noreferrer')

                }

            }
        })
    }

    btn_action(){

        const btn = document.querySelector('#other-icon-back')

        btn.addEventListener('click', () => {

            const ranking = document.querySelector('#container-ranking')
            ranking.style.display = 'flex'

            const view = document.querySelector('#container-view-profile')

            view.remove()
        })
    }
}