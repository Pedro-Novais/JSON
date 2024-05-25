import { ButtonsActionsPersonalizationsInternal } from "./utils/btn_actions.js";
import { get_json } from "../../../utils/functionsReq.js";
import { get_token } from "../../../utils/getToken.js";
import { PopUpGlobal } from "../../../utils/popup_global.js";
import { API } from "../../../utils/endPoints.js";

class PersonalizationEmail{

    constructor(){
        
        new ButtonsActionsPersonalizationsInternal().btn_back()
        this.get_email()
        this.builder_actions()

    }

    async get_email(){

        const token = get_token()
        const response = await get_json(API.url_get_user_personalization, token)

        if(!response.ok){
            console.error('Algum erro ocorreu ao selecionas as infromações de atualização de email')
            return false
        }

        const email_element = document.querySelector('#value-actual-email-personalization')

        email_element.innerHTML = response.responseData.email
    }

    builder_actions(){

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

    validation_personalization(status){

        if(status.status == false){

            new PopUpGlobal('#main-profile', 'Informação', status.msg)
            return false
        }

        console.log('passou')

    }
}

new PersonalizationEmail()