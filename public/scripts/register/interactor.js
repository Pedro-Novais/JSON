import { PopUpGlobal } from "../utils/popup_global.js"
import { post } from "../utils/functionsReq.js"
import { mark_header } from "../utils/markHeader.js"
import { valid_email } from "../utils/general.js"
import { InsertCode } from "./src/insert_code.js"
import { API } from "../utils/endPoints.js"

export class InteractorRegister {

    constructor(data = false) {

        mark_header('register')
        history.pushState({}, '', '/register')

        this.view_backed(data)

        const btn = document.querySelector('#btn-register')
        this.verify_info = this.verify_infos.bind(this);
        btn.addEventListener('click', this.verify_info)

    }

    verify_infos() {

        const name = document.querySelector('#value-name')
        const email = document.querySelector('#value-email')
        const password = document.querySelector('#value-password')

        name.value = "Teste"
        email.value = "test@gmail.com"
        password.value = "teste123$"

        const name_trim = name.value.trim()
        const email_trim = email.value.trim()
        const password_trim = password.value.trim()

        if (name_trim == "" || email_trim == "" || password_trim == "") {

            new PopUpGlobal("#main-enter", "Informação!", "É necessário preencher todos os campos!")
            return false
        }

        const email_valid = valid_email(email.value)

        if (!email_valid) {

            new PopUpGlobal("#main-enter", "Informação!", "Insira um email válido!")
            return false

        }

        if (password.value.length < 7) {

            new PopUpGlobal("#main-enter", "Informação!", "Sua senha precisa conter no mínimo 7 caracteres!")
            return false

        }

        const password_symbol = /[!@#$%^&*?]/.test(password.value)
        const password_number = /\d/.test(password.value);

        if (!password_symbol || !password_number) {

            new PopUpGlobal("#main-enter", "Informação!", "Sua senha precisa conter números e símbolos! Ex: !@#$%^&*? ")
            return false

        }

        this.create_code(name.value, email.value, password.value)
    }

    async create_code(name, email, password) {

        const data = {
            email: email
        }

        const response = await post(API.url_create_code, data)

        if (!response.ok) {

            if (response.status == 409) {

                new PopUpGlobal("#main-enter", "Informação!", `${response.responseData.msg}`)
                return false

            } else {

                new PopUpGlobal("#main-enter", "Erro!", 'Algum erro desconhecido ocorreu ao realizar seu cadastro!')
                return false
            }
        }

        const data_user = {
            name: name,
            email: email,
            password: password
        }

        new InsertCode(data_user)
    }

    view_backed(data = false){

        if(!data){

            return false
        }

        const name = document.querySelector('#value-name')
        const email = document.querySelector('#value-email')
        const password = document.querySelector('#value-password')

        name.value = data.name
        email.value = data.email

    }
}