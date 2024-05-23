import { get_json, patch } from "../../../utils/functionsReq.js"
import { change_view } from "../../../utils/changeView.js"
import { get_token } from "../../../utils/getToken.js"
import { API } from "../../../utils/endPoints.js"

class InteractorPersonalization {

    constructor() {

        this.action_btn_back()
        this.get_infos_personalization()
    }

    async get_infos_personalization() {

        const token = get_token()

        const response = await get_json(API.url_get_user_personalization, token)

        if (!response.ok) {
            console.error('Algum erro ocorreu ao selecionar as infomações de personalização')
            return false
        }

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
                console.log('modals')
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

        if(info_div.textContent === new_value.value){
          
            return true

        }

        const data = {
            [type]: new_value.value
        }

        const token = get_token()
        const response = await patch(API.url_get_user, data, token)

        if(!response.ok){

            console.error('Erro ao atualizar as informações do perfil')
        
        }else{

            info_div.innerHTML = new_value.value

        }

    }

    builder_click_convert_div() {

    }

    action_btn_back() {

        const btn = document.querySelector('#icon-back')

        btn.addEventListener('click', () => {

            change_view(API.url_view_profile)
        })
    }
}

new InteractorPersonalization()