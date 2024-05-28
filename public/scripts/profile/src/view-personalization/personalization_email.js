import { ButtonsActionsPersonalizationsInternal } from "./utils/btn_actions.js";
import { get_json, post } from "../../../utils/functionsReq.js";
import { get_token } from "../../../utils/getToken.js";
import { PopUpGlobal } from "../../../utils/popup_global.js";
import { API } from "../../../utils/endPoints.js";
import { change_view } from "../../../utils/changeView.js";
import { modal } from "../../../utils/modals_views.js";
import { PersonalizationCode } from "./personalization_code.js";

export class PersonalizationEmail {

    constructor() {

        new ButtonsActionsPersonalizationsInternal().btn_back()
        this.get_email()
        this.builder_actions()

    }

    async get_email() {

        const token = get_token()
        const response = await get_json(API.url_get_user_personalization, token)

        if (!response.ok) {
            console.error('Algum erro ocorreu ao selecionas as infromações de atualização de email')
            return false
        }

        const email_element = document.querySelector('#value-actual-email-personalization')

        email_element.innerHTML = response.responseData.email
    }

    builder_actions() {

        const btn = document.querySelector('#btn-customization-security')

        btn.addEventListener('click', () => {

            const status = new ButtonsActionsPersonalizationsInternal().btn_send(
                '#value-new-email-personalization',
                '#value-new-email-confirmation-personalization',
                'email'
            )

            this.validation_personalization(status)
        })
    }

    async validation_personalization(status) {

        if (status.status == false) {

            new PopUpGlobal('#main-profile', 'Informação', status.msg)
            return false
        }

        const data = {
            email: status.new_email
        }

        const token = get_token()
        const response = await post(API.url_create_code, data, token)
       
        if(response.status === 409){

            new PopUpGlobal('#main-profile', 'Informação', 'Novo email digitado já está cadastrado! Digite um outro email!')
            return false
        }

        if(response.status === 201){

            localStorage.setItem('new_email', status.new_email)

            history.pushState({}, '', `?type=code`) 

            const container = document.querySelector('#view-infos-unique')
            container.innerHTML = modal['code']

            new PersonalizationCode()

        }
    }
}