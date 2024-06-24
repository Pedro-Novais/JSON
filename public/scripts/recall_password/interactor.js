import { PopUpGlobal } from "../utils/popup_global.js"
import { post, patch } from "../utils/functionsReq.js"
import { API } from "../utils/endPoints.js"
import { valid_only_number } from "../utils/general.js"

export class ChangePassword {

    constructor() {

        this.get_data()

    }

    async get_data() {

        let identifier = null
        
        const url = new URL(window.location.href)
        const params = new URLSearchParams(url.search);

        params.forEach((value, key) => {

            identifier = value

        });

        const data = {
            identifier: identifier
        }


        const response = await post(API.url_recall_code, data)

        if(!response.ok){

            new PopUpGlobal('#main-enter', 'Erro', 'Link expirado!', 2000, '/welcome')
            return false
        }
        
        this.action_btn(identifier, response.responseData.email)
    }

    action_btn(value_code, email){

        console.log(value_code, email)

        const btn = document.querySelector('#btn-recall')

        btn.addEventListener('click', async () => {

            const password = document.querySelector('#value-password').value
            const password_confirm = document.querySelector('#value-password-confirmation').value

            const password_trim = password.trim()
            const confirm_trim = password_confirm.trim()

            if(password_trim == '' || confirm_trim == ''){

                new PopUpGlobal('#main-enter', 'Informação!', 'Necessário preencher todos os campos!')
                return false

            }

            if(password !== password_confirm){

                new PopUpGlobal('#main-enter', 'Informação!', 'Senhas digitadas não estão iguais!')
                return false

            }

            if(password.length < 7){

                new PopUpGlobal('#main-enter', 'Informação!', 'Sua senha precisa conter no mínimo 7 caracteres!')
                return false
            }

            const password_symbol = /[!@#$%^&*?]/.test(password)
            const password_number = /\d/.test(password);

            if(!password_number || !password_symbol){

                new PopUpGlobal('#main-enter', 'Informação!', 'Sua senha precisa conter números e símbolos! Ex: !@#$%^&*?')
                return false

            }

            const data = {
                email: email,
                code: value_code,
            }

            const response = await post(API.url_verify_code, data)

            if(!response.ok){

                new PopUpGlobal('#main-enter', 'Erro!', 'Erro au redefinir sua senha!', 2000, '/welcome')
                return false

            }

            const data_update = {
                email: email,
                password: password
            } 

            const response_update = await post(API.url_recall_password, data_update)

            console.log(response_update)

            if(!response_update){

                new PopUpGlobal('#main-enter', 'Erro!', 'Erro au redefinir sua senha!', 2000, '/welcome')
                return false

            }

            new PopUpGlobal('#main-enter', 'Informação!', 'Senha atualizada com sucesso!', 2000, '/login')
        })
    }
}