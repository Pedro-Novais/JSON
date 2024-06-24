import { MODAL } from "./utils/modal.js"
import { ChangeView } from "../nChangeView.js"
import { ChangeViewOut } from "../nChangeViewOut.js"

export class Responsive {

    constructor() {

        const identifier = document.querySelector('[identifier]')

        const located = identifier.getAttribute('identifier')
        console.log(located)

        if(located == 'list' || located == 'profile' || located == 'ranking'){

            this.action_bar()
        }
        else if(located == 'welcome' || located == 'login' || located == 'register'){

            this.action_bar(true)
        }
    }

    action_bar(out = null) {

        const body = document.querySelector('body')
        const bar = document.querySelector('#bar-view-options')

        bar.addEventListener('click', () => {
            
            const div_bar = document.createElement('div')

            div_bar.setAttribute('id', 'bar-options')
            div_bar.setAttribute('class', 'style-bar-options')

            div_bar.style.animation = "slideBar .3s ease-out"

            if(out){
                div_bar.innerHTML = MODAL.bar_out;
            }else{

                div_bar.innerHTML = MODAL.bar;
            }

            body.appendChild(div_bar)

            this.action_icons(div_bar)
            this.listenners_clicks(div_bar, out)
        })
    }

    action_icons(div_bar) {

        const btn_close = document.querySelector('#cancel-bar')

        btn_close.addEventListener('click', () => {

            div_bar.style.animation = "closeBar .3s ease-out"

            setTimeout(() => {
                div_bar.remove()
            }, 250)
        })
    }

    listenners_clicks(div_bar, out) {

        if(!out){

            const LINK_PROFILE = document.querySelector('#visit-profile-responsive')
            const LINK_LIST = document.querySelector('#visit-list-responsive')
            const LINK_RANKING = document.querySelector('#visit-ranking-responsive')
            const LINK_OUT = document.querySelector('#logout-responsive')
    
            const main = document.querySelector('main')
            const identifier = main.getAttribute('identifier')
    
            LINK_PROFILE.addEventListener('click', () => {
    
                if (identifier !== "profile") {
    
                    div_bar.style.animation = "closeBar .3s ease-out"
    
                    setTimeout(() => {
                        new ChangeView().change_page_profile()
                        div_bar.remove()
                    }, 250)
    
                } else {
                    div_bar.style.animation = "closeBar .3s ease-out"
                    setTimeout(() => { div_bar.remove() }
                        , 250)
                }
            })
    
            LINK_LIST.addEventListener('click', () => {
    
                if (identifier !== "list") {
    
                    div_bar.style.animation = "closeBar .3s ease-out"
    
                    setTimeout(() => {
                        new ChangeView().change_page_list()
                        div_bar.remove()
                    }, 250)
                } else {
                    div_bar.style.animation = "closeBar .3s ease-out"
                    setTimeout(() => { div_bar.remove() }
                        , 250)
                }
            })
    
            LINK_RANKING.addEventListener('click', () => {
    
                if (identifier !== "ranking") {
    
                    div_bar.style.animation = "closeBar .3s ease-out"
    
                    setTimeout(() => {
                        new ChangeView().change_page_ranking()
                        div_bar.remove()
                    }, 250)
                } else {
                    div_bar.style.animation = "closeBar .3s ease-out"
                    setTimeout(() => { div_bar.remove() }
                        , 250)
                }
            })
    
            LINK_OUT.addEventListener('click', async () => {
                
                div_bar.style.animation = "closeBar .3s ease-out"
    
                    setTimeout(() => {
                        new ChangeView().change_page_out()
                        div_bar.remove()
                    }, 250)
    
            }
            )
        }else{

            const LINK_WELCOME = document.querySelector('#visit-welcome-responsive')
            const LINK_LOGIN = document.querySelector('#visit-login-responsive')
            const LINK_REGISTER = document.querySelector('#visit-register-reponsive')

            const main = document.querySelector('main')
            const identifier = main.getAttribute('identifier')
    
            LINK_WELCOME.addEventListener('click', () => {
    
                if (identifier !== "welcome") {
    
                    div_bar.style.animation = "closeBar .3s ease-out"
    
                    setTimeout(() => {
                        new ChangeViewOut().change_page_welcome()
                        div_bar.remove()
                    }, 250)
    
                } else {
                    div_bar.style.animation = "closeBar .3s ease-out"
                    setTimeout(() => { div_bar.remove() }
                        , 250)
                }
            })
    
            LINK_LOGIN.addEventListener('click', () => {
    
                if (identifier !== "login") {
    
                    div_bar.style.animation = "closeBar .3s ease-out"
    
                    setTimeout(() => {
                        new ChangeViewOut().change_page_login()
                        div_bar.remove()
                    }, 250)
                } else {
                    div_bar.style.animation = "closeBar .3s ease-out"
                    setTimeout(() => { div_bar.remove() }
                        , 250)
                }
            })
    
            LINK_REGISTER.addEventListener('click', () => {
    
                if (identifier !== "register") {
    
                    div_bar.style.animation = "closeBar .3s ease-out"
    
                    setTimeout(() => {
                        new ChangeViewOut().change_page_register()
                        div_bar.remove()
                    }, 250)
                } else {
                    div_bar.style.animation = "closeBar .3s ease-out"
                    setTimeout(() => { div_bar.remove() }
                        , 250)
                }
            })
        }
    }
}