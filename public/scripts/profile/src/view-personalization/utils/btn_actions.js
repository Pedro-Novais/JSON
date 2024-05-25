import { valid_email } from "../../../../utils/general.js"
import { get_token } from "../../../../utils/getToken.js"
import { change_view } from "../../../../utils/changeView.js"
import { API } from "../../../../utils/endPoints.js"

export class ButtonsActionsPersonalizationsInternal {

    btn_send
        (
            element,
            element_confirmation,
            type,
            element_password = null,
        ) {

        const new_element = document.querySelector(element)
        const new_confirmation_element = document.querySelector(element_confirmation)

        const trim = new_element.value.trim()
        const confirmation_trim = new_confirmation_element.value.trim()

        if (element_password) {


            if (element_password.value == "") {

                console.warn(`Sua senha atual não pode ser vazia`)
                return { status: false, msg: `Digite sua senha atual!` }
            }

            if (element_password.value.trim() == "") {

                console.warn(`Sua senha atual não pode ser vazia`)
                return { status: false, msg: `Digite sua senha atual!` }
            }
        }

        if (new_element.value == "") {

            console.warn(`Insira o valor do novo ${type}`)
            return { status: false, msg: `É necessário preencher todos os campos!` }
        }

        if (new_confirmation_element.value == "") {

            console.warn(`Confirme seu ${type}`)
            return { status: false, msg: `É necessário preencher todos os campos!` }
        }

        if (trim == "") {

            console.warn(`O campo de ${type} não pode ser vazio`)
            return { status: false, msg: `É necessário preencher todos os campos!` }
        }

        if (confirmation_trim == "") {

            console.warn(`O campo de confirmação do ${type} não pode ser vazio`)
            return { status: false, msg: `É necessário preencher todos os campos!` }
        }

        if (type == 'password'){

            const password_symbol = /[!@#$%^&*?]/.test(new_element.value)
            const password_number = /\d/.test(new_confirmation_element.value);

            if(new_element.value.length < 7 || new_confirmation_element.value.length < 7){

                console.warn(`Sua nova senha precisa conter no minímo 7 caracteres!`)
                return { status: false, msg: `Sua nova senha precisa conter no minímo 7 caracteres!` }

            }

            if (new_element.value !== new_confirmation_element.value) {

                console.warn('As senhas digitadas não coincidem')
                return { status: false, msg: `Senhas digitada não estão iguais!` }

            }

            if(!password_number || !password_symbol){

                console.warn(`Sua nova senha precisa conter caracteres alfanúmericos e símbolos, ex: !@#$%^&*?`)
                return { status: false, msg: `Sua nova senha precisa conter caracteres alfanúmericos e símbolos, ex: !@#$%^&*?` }

            }

        }

        if (type == 'email') {

            const valid = valid_email(new_element.value)
            const valid_confirmation = valid_email(new_confirmation_element.value)

            if (new_element.value !== new_confirmation_element.value) {

                console.warn('Os emails digitados não coincidem')
                return { status: false, msg: `Emails digitados possuem diferença, verifique e tente novamente!!` }

            }

            if (!valid || !valid_confirmation) {

                console.warn(`Insira um email que seja valido`)
                return { status: false, msg: `Email inválido, insira um novo email!` }
            }
        }

        return {status: true, password: element_password.value, new_password: new_element.value}
    }


    btn_back() {

        const btn = document.querySelector('#icon-back')

        btn.addEventListener('click', async () => {

            const token = get_token()

            await change_view(API.url_view_personalization, token)
        })
    }
}