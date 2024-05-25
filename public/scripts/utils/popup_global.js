import { popup_global } from "./modals.js";

export class PopUpGlobal {

    constructor(element_father, type, info, time = null, redirect = null) {

        this.builder_popup(element_father)
        this.infos_from_popup(type, info)
        this.close_popup(element_father)
        this.redirect_page(time, redirect)
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

    close_popup(element_father) {

        const btn = document.querySelector('#close-popup')
        const popup = document.querySelector('.popup')
        const body = document.querySelector('body')
        const father = document.querySelector(element_father)

        btn.addEventListener('click', () => {

            popup.remove()
            father.style.opacity = '1'
            body.style.pointerEvents = 'auto'
        })
    }

    redirect_page(time, redirect) {

        if (time !== null || redirect !== null) {

            setTimeout(() => {

                window.location.href = redirect

            }, time)
        }

    }
}