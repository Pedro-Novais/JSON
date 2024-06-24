import { post, patch } from "../../../utils/functionsReq.js";
import { ButtonsActionsPersonalizationsInternal } from "./utils/btn_actions.js";
import { get_token } from "../../../utils/getToken.js";
import { PopUpGlobal } from "../../../utils/popup_global.js";
import { API } from "../../../utils/endPoints.js";
import { valid_only_number } from "../../../utils/general.js";

export class PersonalizationCode {

    constructor() {

        new ButtonsActionsPersonalizationsInternal().btn_back('?type=email')
        this.builder_info()
    }

    builder_info() {

        const new_email = localStorage.getItem('new_email')

        const info_to_user = document.querySelector('#info-email-send')

        info_to_user.innerHTML = `O código de confirmação foi enviado ao email: ${new_email}`

        this.builder_actions(new_email)
    }

    builder_actions(email) {

        const token = get_token()

        const btn_send_again = document.querySelector('#send-code-again')
        const btn_verify = document.querySelector('#btn-verify-code-personalization')

        btn_send_again.addEventListener('click', async () => {

            const data = {
                email: email
            }

            const response = await post(API.url_create_code, data, token)

            if (!response.ok) {

                new PopUpGlobal('#main-profile', 'Erro!', 'Ocorreu algum erro ao enviar um novo código ao seu email!')
                return false
            }

            new PopUpGlobal('#main-profile', 'Informação!', `Um novo código de confirmação foi enviado ao email: ${email}!`)

        })

        btn_verify.addEventListener('click', () => {

            this.send_code(email)
        })
    }

    async send_code(email) {

        const code_element = document.querySelector('#code')

        const status = this.code_validations(code_element.value, email)

        if(!status.status){

            new PopUpGlobal('#main-profile', 'Informação!', status.msg)
            return false
        }

        const token = get_token()

        const data = {
            email: email,
            code: code_element.value
        }

        const response = await post(API.url_verify_code, data, token)

        if(response.status === 401){

            new PopUpGlobal('#main-profile', 'Erro!', response.responseData.msg)
            return false

        }

        if(!response.ok){

            new PopUpGlobal('#main-profile', 'Erro!', 'Algum erro desconhecido ocorreu ao verificar seu código!')
            return false
        }

        const data_new_email = {
            email: email
        }

        const response_update_email = await patch(API.url_get_user, data_new_email, token)

        if(!response_update_email.ok){
            
            new PopUpGlobal('#main-profile', 'Erro!', 'Algum erro ocorreu ao atualizar seu email, você será redirecionado para a página de personalização!', 5000, API.url_view_personalization)
            return false
        }

        localStorage.removeItem('new_email')
        new PopUpGlobal('#main-profile', 'Informação!', 'Email alterado com sucesso!', 2000, API.url_view_personalization)

    }

    code_validations(code, email){

        const trim = code.trim()

        if(code == "" || trim == ""){
            
            console.warn('Insira o código de confrimação enviado ao seu email!')
            return {status: false, msg: `Insira o código de confirmação enviado ao email: ${email}!`}

        }

        if(code.length < 6 || code.length > 6){
            
            console.warn('Quantidade de caracteres inválida!')
            return {status: false, msg: 'Quantidade de caracteres inválida!'}

        }

        const code_number = valid_only_number(code)

        if(!code_number){

            console.warn('O código de confirmção contém apenas números!')
            return {status: false, msg: 'O código de confirmção contém apenas números!'}

        }

        return {status: true}
    }
}