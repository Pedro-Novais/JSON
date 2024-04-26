import { otherViewProfile } from "./utils/modals.js";
import { formatedDate } from "./utils/utilsInitial.js";

export function viewOtherProfile(user){

    const div = document.createElement('div')
    const main = document.querySelector('main')
    const ranking = document.querySelector('#container-ranking')

    console.log(user)
    viewModal()

    function viewModal(){

        ranking.style.display = "none"

        div.setAttribute('id', 'container-view-profile')

        div.innerHTML = otherViewProfile

        main.appendChild(div)

        iconBack()

        insertInfos()

    }

    function insertInfos(){

        const element = [
            document.querySelector('#other-view-name'),
            document.querySelector('#other-info-since'),
            document.querySelector('#other-info-ranking'),
            document.querySelector('#other-info-connections'),
            document.querySelector('#other-info-task-created'),
            document.querySelector('#other-info-task-finished'),
            document.querySelector('#other-info-task-canceled'),
            document.querySelector('#other-text-user-description'),
            document.querySelector('#other-text-user-medias'),
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
            "Adição em breve"
        ]

        for(let i = 0; i < 9; i++){

            element[i].innerHTML = values[i]

        }

    }

    function iconBack(){

        const back = document.querySelector('#other-icon-back')

        back.addEventListener('click', () => {

            div.remove()
            ranking.style.display = "flex"

        })

    }

}