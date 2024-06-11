import { post } from "../../utils/functionsReq.js"
import { modal } from "../../utils/modals_views.js"
import { PopUpGlobal } from "../../utils/popup_global.js"
import { InteractorRegister } from "../interactor.js"
import { API } from "../../utils/endPoints.js"
import { valid_only_number } from "../../utils/general.js"

export class InsertCode {

    constructor(data) {

        this.view_code(data.email)
        this.verify_code(data)
        this.send_code_again(data.email)
        this.btn_back(data)

    }

    view_code(email) {

        history.pushState({}, '', '?insert_code=true')

        const main = document.querySelector('main')

        main.innerHTML = modal['code_register']

        new PopUpGlobal("#main-enter", "Informação!", `Um código de confirmação foi enviado ao email: ${email}`)
    }

    verify_code(data) {

        const btn = document.querySelector('#btn-verify-code')

        btn.addEventListener('click', async () => {

            const code = document.querySelector('#value-code')
            const code_trim = code.value.trim()

            if (code_trim == "") {

                new PopUpGlobal("#main-enter", "Informação!", `Insira o código de confirmação que foi enviado ao email: ${data.email}`)
                return false

            }

            if(code.value.length != 6 || !valid_only_number(code.value)){

                new PopUpGlobal("#main-enter", "Informação!", `O código inserido está inválido!`)
                return false

            }

            const data_code = {
                email: data.email,
                code: code.value
            }

            const response = await post(API.url_verify_code, data_code)

            if(!response.ok){
                
                if(response.status == 401){
                    
                    new PopUpGlobal("#main-enter", "Erro!", `${response.responseData.msg}`)
                    return false

                }
                else if(response.status == 400){

                    new PopUpGlobal("#main-enter", "Erro!", `Algum erro desconhecido ocorreu ao processar sua requisição!`)
                    return false

                }
                else{

                    new PopUpGlobal("#main-enter", "Erro!", `Algum erro desconhecido ocorreu ao processar sua requisição!`)
                    return false
                }
            }

            if(response.status == 201){

                this.create_new_account(data)

            }
        })
    }

    async create_new_account(data){

        const response = await post(API.url_make_register, data)

        if(!response.ok){

            if(response.status == 400){

                new PopUpGlobal("#main-enter", "Erro!", `O email cadastrado já está sendo utilizado!`, 1000, API.url_register)
                return false

            }
            else{

                new PopUpGlobal("#main-enter", "Erro!", `Algum erro desconhecido ocorreu ao criar sua conta!`)
                return false

            }
        }

        if(response.status == 201){

            localStorage.setItem('token', response.responseData.token)

            new PopUpGlobal("#main-enter", "Informação!", `Conta criada com sucesso!`, 500, API.url_view_list)
        }
    }

    send_code_again(email) {

        const btn = document.querySelector('#re-send-code')

        btn.addEventListener('click', async () => {

            const data = {
                email: email
            }

            const response = await post(API.url_create_code, data)

            if (!response.ok) {

                new PopUpGlobal("#main-enter", "Erro!", `Algum erro desconhecido ocorreu ao criar um novo código!`)
                return false
            }

            new PopUpGlobal("#main-enter", "Informação!", `${response.responseData.msg}`)
        })
    }

    btn_back(data) {

        const btn = document.querySelector('#back-page')

        btn.addEventListener('click', () => {

            const main = document.querySelector('main')

            main.innerHTML = modal['register']

            new InteractorRegister(data)
        })
    }
}