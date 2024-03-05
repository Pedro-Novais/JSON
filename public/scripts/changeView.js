import { profile, listToDo } from "./utils/modals.js"
import { interactorProfile } from "./scriptProfile.js"
import { interactorList } from "./script.js"
import { interactorResponsive } from "./responsive/responsiveInternal.js"

const div = document.createElement('div')

const linkToDo = document.querySelector('#visit-list')
const linkProfile = document.querySelector('#visit-profile')
const linkAbout = document.querySelector('#logout')

const header = document.querySelector('header')
const main = document.querySelector('main')
const footer = document.querySelector('footer')

linkProfile.addEventListener('click', callPageProfile)
linkAbout.addEventListener('click', logout)

initial()
interactorResponsive(1)

function logout(){
    localStorage.removeItem('token')
    window.location.href = "/login"
}

function callPageList() {
     
    let width = window.innerWidth 

    if (width <= 800) { 

    header.style.display = "flex";
    main.style.display = "flex";
    footer.style.display = "flex";

    let divOptions = document.querySelector('#bar-options')
    divOptions.remove()

    }

if (linkProfile.className == 'li-visits') {

    linkProfile.removeAttribute('class', 'li-visits')
}

linkToDo.setAttribute('class', 'li-visits')

div.remove()
div.setAttribute('id', 'container')

div.innerHTML = listToDo
main.appendChild(div)

interactorList()

linkToDo.removeEventListener('click', callPageList)
linkProfile.addEventListener('click', callPageProfile)
}

function callPageProfile() {

    let width = window.innerWidth

    if (width <= 800) {

        header.style.display = "flex";
        main.style.display = "flex";
        footer.style.display = "flex";

        let divOptions = document.querySelector('#bar-options')
        divOptions.remove()

    }

    if (linkToDo.className == 'li-visits') {

        linkToDo.removeAttribute('class', 'li-visits')
    }

    linkProfile.setAttribute('class', 'li-visits')

    div.setAttribute('id', 'main-profile')

    div.innerHTML = profile
    main.appendChild(div)

    interactorProfile()

    linkProfile.removeEventListener('click', callPageProfile)
    linkToDo.addEventListener('click', callPageList)
}

function initial() {

    div.setAttribute('id', 'container')
    linkToDo.setAttribute('class', 'li-visits')

    div.innerHTML = listToDo
    main.appendChild(div)

    interactorList()
}

export { callPageList, callPageProfile, logout }