import { ButtonsActionsPersonalizationsInternal } from "./utils/btn_actions.js";
import { PopUpGlobal } from "../../../utils/popup_global.js";

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

    validation_personalization(status){

        if(status.status == false){

            new PopUpGlobal('#main-profile', 'Informação', status.msg)
            return false
        }

        console.log('passou')

    }

}

new PersonalizationPassword()