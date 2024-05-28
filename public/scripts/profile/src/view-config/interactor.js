import { get_json, patch } from "../../../utils/functionsReq.js"
import { get_token } from "../../../utils/getToken.js"
import { API } from "../../../utils/endPoints.js"
import { PopUpGlobal } from "../../../utils/popup_global.js"

export class InteractorConfiguration {

    constructor() {

        this.get_config()

    }

    async get_config() {

        const token = get_token()

        const response = await get_json(API.url_config, token)

        if (!response.ok) {

            console.log('Algum erro ocorreu ao selecionar as configurações')
            return false
        }

        this.builder_configuration(response.responseData)
    }

    builder_configuration(configs) {

        this.defined_status(configs)
        this.action_change_state_config()

        const btn_send = document.querySelector('#btn-save-configs')

        btn_send.addEventListener('click', () => {

            this.send_new_configs(configs)

        })
    }

    defined_status(configs) {

        const line_config = document.querySelectorAll('.ball-option')

        for (let i = 0; i < line_config.length; i++) {

            const ball_marked = line_config[i].querySelector(':first-child')
            const id_config = line_config[i].getAttribute('id')

            if (configs[id_config]) {

                line_config[i].setAttribute('actived', true)
                line_config[i].style.backgroundColor = 'green'
                ball_marked.style.left = '44.8%'
            }
            else {

                line_config[i].setAttribute('actived', false)
                line_config[i].style.backgroundColor = 'red'
                ball_marked.style.left = 'unset'
            }
        }
    }

    action_change_state_config() {

        const line_config = document.querySelectorAll('.ball-option')

        line_config.forEach(element => {

            element.addEventListener('click', () => {

                const state = element.getAttribute('actived')

                const state_changed = this.change_state(state)

                element.setAttribute('actived', state_changed)

                this.change_positions_state(element, state_changed)
            })
        })
    }

    change_positions_state(element, actived) {

        const ball_marked = element.querySelector(':first-child')

        if (actived) {

            element.style.backgroundColor = 'green'
            ball_marked.style.left = '44.8%'
        }
        else {

            element.style.backgroundColor = 'red'
            ball_marked.style.left = 'unset'
        }
    }

    change_state(element) {

        if (element == "true") {

            return false
        }

        return true
    }

    send_new_configs(configs) {

        const line_config = document.querySelectorAll('.ball-option')
        let new_patchs_config = {}

        for (let i = 0; i < line_config.length; i++) {

            const config_name = line_config[i].getAttribute('id')
            const state_config = line_config[i].getAttribute('actived')

            const boolean_config = this.transform_boolean(state_config)

            if (configs[config_name] != boolean_config) {

                new_patchs_config[config_name] = boolean_config

            }
        }

        this.request_to_change_config(new_patchs_config)

    }

    async request_to_change_config(new_configs) {

        const length_config = Object.keys(new_configs).length

        if (length_config == 0) {

            new PopUpGlobal('#main-profile', 'Informação!', "Nenhuma alteração foi realizada!")
            return false
        }

        const data = {
            new_configs
        }

        const token = get_token()

        const response = await patch(API.url_config, data, token)

        if (!response.ok) {

            new PopUpGlobal('#main-profile', 'Erro!', "Algum erro desconhecido ocorreu ao atualizar sua confirgurações!")
            return false
        }

        new PopUpGlobal('#main-profile', 'Informação!', "Configurações atualizadas com sucesso!")
    }

    transform_boolean(value) {

        if (value.toLowerCase() == "true") {

            return true
        }

        return false
    }
}