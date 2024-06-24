import { modal } from "../utils/modals_views.js"
import { InteractorLogin } from "./interactor.js"
import { PopUpGlobal } from "../utils/popup_global.js"
import { valid_email } from "../utils/general.js"
import { post } from "../utils/functionsReq.js"
import { API } from "../utils/endPoints.js"

export class RecallPassword{

    constructor(){

        this.btn_send()
        this.btn_back()
    }

    btn_send(){

        const btn = document.querySelector('#btn-recall')

        btn.addEventListener('click', async () => {

            const email = document.querySelector('#value-email').value

            const email_trim = email.trim()

            if(email_trim == ""){

                new PopUpGlobal('#main-enter', 'Informação!', 'É necessário preencher o campo de email!')
                return false
            }

            if(!valid_email(email)){

                new PopUpGlobal('#main-enter', 'Informação!', 'Email digitado inválido!')
                return false

            }

            const data = {
                email: email,
                recall: true,
                msg: 'recall',
                subject: 'Redefinir Senha'
            }

            const response = await post(API.url_create_code, data)

            if(!response.ok){

                if(response.status == 400){

                    new PopUpGlobal('#main-enter', 'Erro!', response.responseData.msg)
                    return false

                }
                else{

                    new PopUpGlobal('#main-enter', 'Erro!', `Algum erro desconhecido ocorreu, tente novamente!`)
                    return false

                }
            }

            new PopUpGlobal('#main-enter', 'Informação!', `Um email de redefinição foi enviado para: ${email}`, 10000, '/welcome')

        })
    }

    btn_back(){

        const btn = document.querySelector('#back-login')

        btn.addEventListener('click', () => {

            const main = document.querySelector('main')

            main.innerHTML = modal['login']

            new InteractorLogin()
        })
    }
}