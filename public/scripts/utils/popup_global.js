import { popup_global } from "./modals.js";
import { API } from "./endPoints.js";

export class PopUpGlobal {

    constructor(element_father, type, info, time = null, redirect = null, buttons = null) {

        this.builder_popup(element_father)
        this.infos_from_popup(type, info)
        this.close_popup(element_father)
        this.redirect_page(time, redirect)
        this.insert_buttons(buttons, element_father)
    }

    builder_popup(element_father) {

        const father = document.querySelector(element_father)
        father.style.opacity = '.4'

        const body = document.querySelector('body')
        body.style.pointerEvents = 'none'

        const div = document.createElement('div')

        div.setAttribute('class', 'popup')
        div.innerHTML = popup_global
        div.style.pointerEvents = 'auto'

        body.appendChild(div)

    }

    infos_from_popup(type, info) {

        const title = document.querySelector('#type')
        title.innerHTML = type

        const message = document.querySelector('#info')
        message.innerHTML = info

    }

    close_popup(element_father, action_btn = null) {

        const btn = document.querySelector('#close-popup')
        const popup = document.querySelector('.popup')
        const body = document.querySelector('body')
        const father = document.querySelector(element_father)

        btn.addEventListener('click', () => {

            popup.remove()
            father.style.opacity = '1'
            body.style.pointerEvents = 'auto'
        })

        if(action_btn){
            
            popup.remove()
            father.style.opacity = '1'
            body.style.pointerEvents = 'auto'

        }
    }

    redirect_page(time, redirect) {

        if (time !== null || redirect !== null) {

            setTimeout(() => {

                window.location.href = redirect

            }, time)
        }
    }

    insert_buttons(btn, element_father){

        if(btn === null){

            return false

        }

        if(btn){

            const popup = document.querySelector('.popup')
    
            const container = document.createElement('div')
            container.setAttribute('class', 'container-buttons') 
    
            container.innerHTML = "<div class='btn-popup' id='btn-cancel'> <img src='../svg/xmark-solid.svg'> </div> <div class='btn-popup' id='btn-confirm'> <img src='../svg/check-solid.svg'> </div>"
    
            popup.appendChild(container)

            this.action_buttons(element_father)
        }
    }

    action_buttons(element_father){

        const btn_cancel = document.querySelector('#btn-cancel')
        const btn_confirm = document.querySelector('#btn-confirm')

        btn_cancel.addEventListener('click', () => {

            this.close_popup(element_father, true)

        })

        btn_confirm.addEventListener('click', () => {

            localStorage.removeItem('token')
            
            window.location.href = API.url_welcome
        })
    }
}