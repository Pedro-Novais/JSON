import { profile, listToDo, ranking } from "./utils/modals.js"
import { interactorProfile } from "../scripts-old/scriptProfile.js"
import { interactorList } from "../scripts-old/script.js"
import { interactorRanking } from "../scripts-old/ranking.js"
import { interactorResponsive } from "./responsive/responsiveInternal.js"

const div = document.createElement('div')

const linkToDo = document.querySelector('#visit-list')
const linkProfile = document.querySelector('#visit-profile')
const linkRanking = document.querySelector('#visit-ranking')
const linkOut = document.querySelector('#logout')

const header = document.querySelector('header')
const main = document.querySelector('main')
const footer = document.querySelector('footer')

linkProfile.addEventListener('click', callPageProfile)
linkRanking.addEventListener('click', callPageRanking)
linkOut.addEventListener('click', logout)

initial()
interactorResponsive(1)

function logout() {
    localStorage.removeItem('token')
    window.location.href = "/login"
}

function callPageList() {

    const viewProfile = document.querySelector('#container-view-profile')

    if(viewProfile){
        viewProfile.remove()
        div.style.display = "flex"
    }

    let width = window.innerWidth

    if (width <= 800) {

        header.style.display = "flex";
        main.style.display = "flex";
        footer.style.display = "flex";

        let divOptions = document.querySelector('#bar-options')
        divOptions.remove()

    }

    removeMark()

    linkToDo.setAttribute('class', 'li-visits')

    div.remove()
    div.setAttribute('id', 'container')

    div.innerHTML = listToDo
    main.appendChild(div)

    interactorList()

    linkToDo.removeEventListener('click', callPageList)
    linkProfile.addEventListener('click', callPageProfile)
    linkRanking.addEventListener('click', callPageRanking)

}

function callPageRanking() {

    let width = window.innerWidth

    if (width <= 800) {

        header.style.display = "flex";
        main.style.display = "flex";
        footer.style.display = "flex";

        let divOptions = document.querySelector('#bar-options')
        divOptions.remove()

    }

    removeMark()

    linkRanking.setAttribute('class', 'li-visits')

    div.remove()
    div.setAttribute('id', 'container-ranking')

    div.innerHTML = ranking

    main.appendChild(div)

    interactorRanking()

    linkRanking.removeEventListener('click', callPageRanking)

    linkProfile.addEventListener('click', callPageProfile)
    linkToDo.addEventListener('click', callPageList)

}

function callPageProfile() {

    const viewProfile = document.querySelector('#container-view-profile')

    if(viewProfile){
        viewProfile.remove()
        div.style.display = "flex"
    }

    let width = window.innerWidth

    if (width <= 800) {

        header.style.display = "flex";
        main.style.display = "flex";
        footer.style.display = "flex";

        let divOptions = document.querySelector('#bar-options')
        divOptions.remove()

    }

    removeMark()
    linkProfile.setAttribute('class', 'li-visits')

    div.remove()
    div.setAttribute('id', 'main-profile')

    div.innerHTML = profile
    main.appendChild(div)

    interactorProfile()

    linkProfile.removeEventListener('click', callPageProfile)
    linkToDo.addEventListener('click', callPageList)
    linkRanking.addEventListener('click', callPageRanking)
}

function removeMark() {

    const arrayHeader = [linkProfile, linkToDo, linkRanking]

    for (let i = 0; i < 3; i++) {

        if (arrayHeader[i].className == 'li-visits') {

            arrayHeader[i].removeAttribute('class', 'li-visits')
        }
    }
}

function initial() {

    div.setAttribute('id', 'container')
    linkToDo.setAttribute('class', 'li-visits')

    div.innerHTML = listToDo
    main.appendChild(div)

    interactorList()
}

export { callPageList, callPageProfile, callPageRanking, logout }