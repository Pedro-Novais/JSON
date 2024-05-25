import { post, patch } from "../../../utils/functionsReq.js";
import { get_token } from "../../../utils/getToken.js";
import { ButtonsActionsPersonalizationsInternal } from "./utils/btn_actions.js";
import { PopUpGlobal } from "../../../utils/popup_global.js";
import { API } from "../../../utils/endPoints.js";

class PersonalizationPassword {

    constructor() {
        new ButtonsActionsPersonalizationsInternal().btn_back()
        this.builder_actions()
    }

    builder_actions() {

        const btn = document.querySelector('#btn-customization-security')
        const password = document.querySelector('#value-actual-password-personalization')

        btn.addEventListener('click', () => {

            const status = new ButtonsActionsPersonalizationsInternal().btn_send(
                '#value-new-password-personalization',
                '#value-new-password-confirmation-personalization',
                'password',
                 password
            )

            this.validation_personalization(status)
        })
    }

    async validation_personalization(status){

        if(status.status == false){

            new PopUpGlobal('#main-profile', 'Informação!', status.msg)
            return false
        }

        const data = {
            password: status.password
        }

        const token = get_token()

        const response = await post(API.url_verify_password, data, token)

        if(response.status === 401){

            new PopUpGlobal('#main-profile', 'Informação!', response.responseData.msg)
            return false
        }

        if(response.status === 200){

            const data = {
                password: status.new_password
            }

            const response_modification = await patch(API.url_get_user, data, token)

            if(!response_modification.ok){

                new PopUpGlobal('#main-profile', 'Informação!', response_modification.responseData.msg)
                return false
                
            }

            new PopUpGlobal('#main-profile', 'Informação!', 'Senha alterada com sucesso!', 2000, API.url_view_personalization)

        }
    }

}

new PersonalizationPassword()