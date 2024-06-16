import { get_json, patch } from "../../../utils/functionsReq.js"
import { change_view } from "../../../utils/changeView.js"
import { get_token } from "../../../utils/getToken.js"
import { modal } from "../../../utils/modals_views.js"
import { API } from "../../../utils/endPoints.js"
import { PersonalizationEmail } from "./personalization_email.js"
import { PersonalizationPassword } from "./personalization_password.js"
import { PopUpGlobal } from "../../../utils/popup_global.js"

export class InteractorPersonalization {

    constructor() {

        this.action_btn_back()
        this.get_infos_personalization()
    }

    async get_infos_personalization() {

        const token = get_token()

        const response = await get_json(API.url_get_user_personalization, token)
   
        if (!response.ok) {
          
            new PopUpGlobal('#container-profile', 'Erro!', 'Algum erro desconhecido ocorreu ao carregar suas informações!')
            return false

        }
        
        this.action_btn_social_midias(response.responseData.socialMidias)
        this.builder_infos_div(response.responseData)
        this.builder_click_convert_input()
    }

    builder_infos_div(infos_user) {

        const infos_element_div = document.querySelectorAll('.box-info-to-edit')

        infos_element_div.forEach(element => {

            const value_info = element.getAttribute('identifier')

            element.innerHTML = infos_user[value_info]
        })
    }

    builder_click_convert_input() {

        const icons = document.querySelectorAll('.actions-icon-div')

        icons.forEach(element => {

            const type_personalziation = element.getAttribute('identifier-icon')

            if (type_personalziation == 'name' || type_personalziation == 'description') {

                element.addEventListener('click', () => {


                    const info_div = document.querySelector(`[identifier = '${type_personalziation}']`)
                    const value_div = info_div.textContent

                    const show_input = document.querySelector(`#value-${type_personalziation}-personalization`)
                    const icon_check = document.querySelector(`[identifier-icon-check = '${type_personalziation}']`)

                    element.style.display = 'none'
                    info_div.style.display = 'none'

                    show_input.style.display = 'flex'
                    icon_check.style.display = 'flex'
                    show_input.value = value_div

                    icon_check.addEventListener('click', () => {

                        this.verify_updates_from_infos(type_personalziation)
                    })
                })
            }
            else if (type_personalziation == 'email' || type_personalziation == 'password') {

                element.addEventListener('click', () => {

                    history.pushState({}, '', `?type=${type_personalziation}`)
                    
                    const container = document.querySelector('#view-infos-unique')
                    container.innerHTML = modal[type_personalziation]

                    if(type_personalziation == 'email'){

                        new PersonalizationEmail()
                    }
                    else if(type_personalziation == 'password'){

                        new PersonalizationPassword()
                    }
                })
            }
        })
    }

    async verify_updates_from_infos(type) {

        const info_div = document.querySelector(`[identifier = '${type}']`)
        const icon_div = document.querySelector(`[identifier-icon = '${type}']`)

        const icon_check = document.querySelector(`[identifier-icon-check = '${type}']`)

        const new_value = document.querySelector(`#value-${type}-personalization`)
        const new_value_trim = new_value.value.trim()
  
        if (new_value.value == "" || new_value_trim == "") {

            new_value.style.borderBottomColor = 'red'
            return false
        }

        icon_div.style.display = 'flex'
        info_div.style.display = 'flex'

        new_value.style.display = 'none'
        icon_check.style.display = 'none'

        if (info_div.textContent === new_value.value) {

            return true

        }

        const data = {
            [type]: new_value.value
        }

        const token = get_token()
        const response = await patch(API.url_get_user, data, token)

        if (!response.ok) {

            new PopUpGlobal('#container-profile', 'Erro!', 'Algum erro desconhecido ocorreu ao atualizar suas informações!')
            return false

        } else {

            info_div.innerHTML = new_value.value

        }

    }  

    action_btn_social_midias(midia){

        const elements = document.querySelectorAll('.icon-midias')

        elements.forEach(element => {

            element.addEventListener('click', () => {

                const type = element.getAttribute('id')
    
                if(!type){
    
                    new PopUpGlobal('#container-profile', 'Erro!', 'Tente novamente mais tarde!')
                    return false
                }

                this.view_popup_midias()
                this.interactor_midias(type)

            })
        })
    }

    view_popup_midias(){

        const element_father = document.querySelector('.container-personalization-infos-user')
        const element_out = document.querySelector('.container-personalizations')

        element_out.style.opacity = '.3'

        const div = document.createElement('div')
        div.setAttribute('class', 'popup-personalization-midias')
        div.innerHTML = modal['popup_midias']

        element_father.appendChild(div)
    
    }

    async interactor_midias(type){

        const title = document.querySelector('#title-name')

        const name = document.querySelector('#value-midia-personalization')
        const url = document.querySelector('#value-url-personalization')

        title.innerHTML = type
        
        const token = get_token()

        const response = await get_json(API.url_get_user_personalization, token)

        if(!response.ok){

            new PopUpGlobal('#container-profile', 'Erro!', 'Erro ao carregar seus dados!')
            return false

        }

        const infos = response.responseData.socialMidias[type]
        
        if(infos && infos.state){

            name.value = infos.nameSocialMidia
            url.value = infos.urlSocialMidia

        }

        this.action_btn_midia(type, name, url)
    }

    action_btn_midia(type, name, url){

        const btn_confirm = document.querySelector('#btn-confirm')
        const btn_cancel = document.querySelector('#btn-cancel')

        btn_confirm.addEventListener('click', async () => {

            const token = get_token()

            const name_trim = name.value.trim()
            const url_trim = url.value.trim()

            let data = {}

            if(name_trim == "" && url_trim == ""){

                data = {

                    socialMidia: type,
                    update: {

                        nameSocialMidia: "",
                        urlSocialMidia: "",
                        state: false
                    }
                }
         
            }

            else if(name_trim !== "" && url_trim == ""){

                data = {

                    socialMidia: type,
                    update: {

                        nameSocialMidia: name.value,
                        urlSocialMidia: "",
                        state: true
                    }
                }
            }

            else if(name_trim == "" && url_trim !== ""){

                new PopUpGlobal('#container-profile', 'Informação!', 'É necessário inserir ao realizar a inserção de um link!')
                return false
        
            }

            else if(name_trim !== "" && url_trim !== ""){

                data = {

                    socialMidia: type,
                    update: {

                        nameSocialMidia: name.value,
                        urlSocialMidia: url.value,
                        state: true
                    }
                }
            }

            if(url_trim !== ""){

                const url_valid = this.validate_url(url.value, type)

                if(!url_valid){

                    new PopUpGlobal('#container-profile', 'Erro!', 'Link para rede social inválido!')
                    return false

                }
            }

            const response = await patch(API.url_get_user, data, token)

                if(!response.ok){

                    new PopUpGlobal('#container-profile', 'Erro!', 'Erro ao atualizar seus dados!')
                    return false
                }

                this.close_popup_midia()
        })

        btn_cancel.addEventListener('click', this.close_popup_midia)
    }

    validate_url(url, type){
        try{
            
            const pare_url = new URL(url)
    
            const hostname = pare_url.hostname
            
            if (type == 'twitter'){

                return hostname === `www.${type}.com` || hostname === `${type}.com` || hostname === `www.x.com` || hostname === `x.com`

            }

            return hostname === `www.${type}.com` || hostname === `${type}.com`

        }catch(error){
            
            console.error(error)
            return false
            
        }
    }

    close_popup_midia(){

        const element = document.querySelector('.popup-personalization-midias')
        const element_out = document.querySelector('.container-personalizations')
        
        element_out.style.opacity = 1
        element.remove()
    }

    action_btn_back() {

        const btn = document.querySelector('#icon-back')

        btn.addEventListener('click', () => {

            change_view(API.url_view_profile)
        })
    }
}