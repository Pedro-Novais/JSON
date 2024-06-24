import { modal } from "./modals_views.js";
import { API } from "./endPoints.js";

export class PopUpGlobal {

    constructor(element_father, type, info, time = null, redirect = null, buttons = null, loading = null) {

        this.builder_popup(element_father)
        this.infos_from_popup(type, info)
        this.close_popup(element_father)
        this.redirect_page(time, redirect)
        this.insert_buttons(buttons, element_father)
        this.popup_loading(loading)
    }

    builder_popup(element_father) {

        const view_profile_ranking = this.opacity_container_view_profile('open')

        if (!view_profile_ranking) {
            
            const father = document.querySelector(element_father)
             father.style.opacity = '.4'
        }

        const body = document.querySelector('body')
        body.style.pointerEvents = 'none'

        const div = document.createElement('div')

        div.setAttribute('class', 'popup')
        div.innerHTML = modal.popup_g
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

            const view_profile_ranking = this.opacity_container_view_profile('close')

            if (!view_profile_ranking) {

                father.style.opacity = '1'
            }

            body.style.pointerEvents = 'auto'
        })

        if (action_btn) {

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

    popup_loading(loading){

        if(loading == null){

            return false

        }

        const popup = document.querySelector('.popup')

        const icon = document.querySelector('.icon-close')
        const container = document.querySelector('.container-alert')

        icon.remove()
        container.remove()
        
        const div = document.createElement('div')
        div.setAttribute('class', 'popup-loading')

        popup.appendChild(div)

    }

    close_popup_loading(){
        
        const main = document.querySelector('main')

        const child = main.children[0]

        const body = document.querySelector('body')
        // const main = document.querySelector('#main-profile')
        const popup = document.querySelector('.popup')
        
        body.style.pointerEvents = 'auto'
        child.style.opacity = '1'
        popup.remove()
    }

    insert_buttons(btn, element_father) {

        if (btn === null) {

            return false

        }

        if (btn) {

            const popup = document.querySelector('.popup')

            const container = document.createElement('div')
            container.setAttribute('class', 'container-buttons')

            container.innerHTML = "<div class='btn-popup' id='btn-cancel'> <img src='../svg/xmark-solid.svg'> </div> <div class='btn-popup' id='btn-confirm'> <img src='../svg/check-solid.svg'> </div>"

            popup.appendChild(container)

            this.action_buttons(element_father)
        }
    }

    action_buttons(element_father) {

        const btn_cancel = document.querySelector('#btn-cancel')
        const btn_confirm = document.querySelector('#btn-confirm')

        btn_cancel.addEventListener('click', () => {

            this.opacity_container_view_profile('close')
            this.close_popup(element_father, true)

        })

        btn_confirm.addEventListener('click', () => {

            localStorage.removeItem('token')

            window.location.href = API.url_welcome
        })
    }

    opacity_container_view_profile(type) {

        let container = false;

        if (document.querySelector('#container-view-profile')) {

            container = document.querySelector('#container-view-profile')
        }
        else if (document.querySelector('.modal')) {
            
            container = document.querySelector('.modal')
        }

        if (container) {

            if (type == 'open') {

                container.style.opacity = '.4'
            }

            else if (type == 'close') {

                container.style.opacity = '1'

            }

            return true
        }

        return false
    }
}