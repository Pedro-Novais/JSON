import { PopUpGlobal } from "../utils/popup_global.js"
import { valid_email } from "../utils/general.js"
import { API } from "../utils/endPoints.js"
import { post } from "../utils/functionsReq.js"
import { get_token } from "../utils/getToken.js"
import { mark_header } from "../utils/markHeader.js"

export class InteractorLogin {

    constructor() {

        mark_header('login')
        this.action_buttons()
    }

    action_buttons() {

        const btn_login = document.querySelector('#btn-login')
        const btn_forget = document.querySelector('#forget-password')

        btn_login.addEventListener('click', this.verify_credentials)

        btn_forget.addEventListener('click', () => {

            new PopUpGlobal('#main-enter', 'No futuro!', 'Será adicionado essa função ainda!')
            return false

        })
    }

    async verify_credentials() {

        const email = document.querySelector('#value-email')
        const password = document.querySelector('#value-password')

        const email_trim = email.value.trim()
        const password_trim = password.value.trim()

        if (email_trim == "" || password_trim == "") {

            new PopUpGlobal('#main-enter', 'Informação!', 'É necessário preencher todos os campos!')
            return false
        }

        const email_valid = valid_email(email.value)

        if (!email_valid) {

            new PopUpGlobal('#main-enter', 'Informação!', 'Insira um email válido!')
            return false
        }

        const token = get_token(true)
        const data = {
            email: email.value,
            password: password.value
        }

        const response = await post(API.url_verify_login, data, token)
      
        if (!response.ok) {

            new PopUpGlobal('#main-enter', 'Erro!', `${response.responseData.msg}`)
            return false

        }

        if(response.status == 200){
        
            localStorage.setItem('token', response.responseData.token)
            new PopUpGlobal('#main-enter', 'Informação!', `${response.responseData.msg}`, 500, API.url_view_list)
        
        }
    }
}