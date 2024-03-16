import { interactorLogin } from "./scriptEnter.js"
import { interectorRegister } from "./register.js"
import { login, register } from "./utils/modals.js"
import { interactorResponsive } from "./responsive/responsiveExternal.js"

const linkWelcome = document.querySelector('#visit-welcome')
const linkLogin = document.querySelector('#visit-login')
const linkRegister = document.querySelector('#visit-signup')

const header = document.querySelector('header')
const footer = document.querySelector('footer')
const main = document.querySelector('#main-enter')

const div = document.createElement('div')

linkWelcome.addEventListener('click', callPageWelcome)
linkLogin.addEventListener('click', callPageLogin)
linkRegister.addEventListener('click', callPageRegister)

initial()
interactorResponsive()

function callPageWelcome() {

    let width = window.innerWidth

    if (width <= 800) {

        header.style.display = "flex";
        main.style.display = "flex";
        footer.style.display = "flex";

        let divOptions = document.querySelector('#bar-options')
        divOptions.remove()

    }

    const containerInsert = document.querySelector('#container-register')

    if(containerInsert){

        containerInsert.remove()

    }else{

        div.remove()

    }

    pageSelectMoment()

    linkWelcome.setAttribute('class', 'li-visits')

    linkWelcome.removeEventListener('click', callPageWelcome)
    linkLogin.addEventListener('click', callPageLogin)
    linkRegister.addEventListener('click', callPageRegister)
}

function callPageLogin() {

    let width = window.innerWidth

    if (width <= 800) {

        header.style.display = "flex";
        main.style.display = "flex";
        footer.style.display = "flex";

        let divOptions = document.querySelector('#bar-options')
        divOptions.remove()

    }

    const containerInsert = document.querySelector('#container-register')

    if(containerInsert){

        containerInsert.remove()

    }else{

        div.remove()

    }

    pageSelectMoment()

    linkLogin.setAttribute('class', 'li-visits')

    div.setAttribute('class', 'conatiner-credentials')
    div.setAttribute('id', 'container-login')

    div.innerHTML = login

    main.appendChild(div)
    interactorLogin()

    linkWelcome.addEventListener('click', callPageWelcome)
    linkLogin.removeEventListener('click', callPageLogin)
    linkRegister.addEventListener('click', callPageRegister)

}

function callPageRegister() {

    let width = window.innerWidth

    if (width <= 800) {

        header.style.display = "flex";
        main.style.display = "flex";
        footer.style.display = "flex";

        let divOptions = document.querySelector('#bar-options')
        divOptions.remove()

    }

    div.remove()

    pageSelectMoment()

    linkRegister.setAttribute('class', 'li-visits')

    div.setAttribute('class', 'conatiner-credentials')
    div.setAttribute('id', 'container-register')

    div.innerHTML = register

    main.appendChild(div)


    interectorRegister()

    linkWelcome.addEventListener('click', callPageWelcome)
    linkLogin.addEventListener('click', callPageLogin)
    linkRegister.removeEventListener('click', callPageRegister)

}

function initial() {
    div.setAttribute('class', 'conatiner-credentials')
    div.setAttribute('id', 'container-login')
    linkLogin.setAttribute('class', 'li-visits')

    div.innerHTML = login

    main.appendChild(div)
    interactorLogin()

}

function pageSelectMoment() {
    if (linkWelcome.classList == "li-visits") {
        linkWelcome.removeAttribute('class', 'li-visits')
    }
    else if (linkLogin.classList == "li-visits") {
        linkLogin.removeAttribute('class', 'li-visits')
    }
    else if (linkRegister.classList == "li-visits") {
        linkRegister.removeAttribute('class', 'li-visits')
    }
}

export { callPageWelcome, callPageLogin, callPageRegister }