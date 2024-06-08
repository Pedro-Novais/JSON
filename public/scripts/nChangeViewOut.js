import { change_view } from "./utils/changeViewOut.js"
import { API } from "./utils/endPoints.js"

export class ChangeViewOut{

    constructor(identifier) {
     
        this.enabled_events()
        this.listenner_clicks(identifier)

    }

    listenner_clicks(identifier) { 

        const LINK_WELCOME = document.querySelector('#visit-welcome')
        const LINK_LOGIN = document.querySelector('#visit-login')
        const LINK_REGISTER = document.querySelector('#visit-register')

        if (identifier !== "welcome") {

            LINK_WELCOME.addEventListener('click', this.change_page_welcome)

        }

        if (identifier !== "login") {

            LINK_LOGIN.addEventListener('click', this.change_page_login)
            
        }

        if (identifier !== "register") {

            LINK_REGISTER.addEventListener('click', this.change_page_register)
            
        }
    }

    enabled_events(){

        const LINK_WELCOME = document.querySelector('#visit-welcome')
        const LINK_LOGIN = document.querySelector('#visit-login')
        const LINK_REGISTER = document.querySelector('#visit-register')

        LINK_WELCOME.removeEventListener('click', this.change_page_welcome)
        LINK_LOGIN.removeEventListener('click', this.change_page_login)
        LINK_REGISTER.removeEventListener('click', this.change_page_register)

    }

    change_page_welcome(){
       
        change_view(API.url_welcome)

    }

    change_page_login(){

        change_view(API.url_login)

    }

    change_page_register(){

        change_view(API.url_register)

    }
}