import { valid_email } from "../../../../utils/general.js"
import { get_token } from "../../../../utils/getToken.js"
import { change_view } from "../../../../utils/changeView.js"
import { API } from "../../../../utils/endPoints.js"

export class ButtonsActionsPersonalizationsInternal {

    btn_send
        (
            btn_element,
            btn_element_confirmation,
            type
        ) {

        const new_element = document.querySelector(btn_element)
        const new_confirmation_element = document.querySelector(btn_element_confirmation)

        const trim = new_element.value.trim()
        const confirmation_trim = new_confirmation_element.value.trim()

        if (new_element.value == "") {

            console.warn(`Insira o valor do novo ${type}`)
            return false
        }

        if (new_confirmation_element.value == "") {

            console.warn(`Confirme seu ${type}`)
            return false
        }

        if (trim == "") {

            console.warn(`O campo de ${type} não pode ser vazio`)
            return false
        }

        if (confirmation_trim == "") {

            console.warn(`O campo de confirmação do ${type} não pode ser vazio`)
            return false
        }


        if (type == 'email') {
            
            const valid = valid_email(new_element.value)
            const valid_confirmation = valid_email(new_confirmation_element.value)

            if (!valid || !valid_confirmation) {

                console.warn(`insira um email que seja valido`)
                return false
            }

            if (new_element.value !== new_confirmation_element.value) {

                console.warn('Os emails digitados não coincidem')
                return false

            }
        }

        console.log('Passou')
        return true
    }


    btn_back() {

        const btn = document.querySelector('#icon-back')

        btn.addEventListener('click', async () => {

            const token = get_token()

            await change_view(API.url_view_personalization, token)
        })
    }
}