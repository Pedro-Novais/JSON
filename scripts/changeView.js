import { profile, listToDo } from "./utils/modals.js"
import { interactorProfile } from "./scriptProfile.js"
import { interactorList } from "./script.js"

const div = document.createElement('div')

const linkToDo = document.querySelector('#visit-list')
const linkProfile = document.querySelector('#visit-profile')
const linkAbout = document.querySelector('#visit-about')

//const containerToDo = document.querySelector('#container')

const body = document.querySelector('body')
const main = document.querySelector('main')

linkProfile.addEventListener('click', callPageProfile)

initial()

function callPageList() {
    div.remove()
    div.setAttribute('id', 'container')

    div.innerHTML = listToDo
    //containerToDo.remove()
    main.appendChild(div)

    interactorList()

    linkToDo.removeEventListener('click', callPageList)
    linkProfile.addEventListener('click', callPageProfile)
}

function callPageProfile() {
    div.setAttribute('id', 'main-profile')

    div.innerHTML = profile
    //containerToDo.remove()
    main.appendChild(div)

    interactorProfile()

    linkProfile.removeEventListener('click', callPageProfile)
    linkToDo.addEventListener('click', callPageList)
}

function initial(){
    div.setAttribute('id', 'container')

    div.innerHTML = listToDo
    //containerToDo.remove()
    main.appendChild(div)

    interactorList()
}