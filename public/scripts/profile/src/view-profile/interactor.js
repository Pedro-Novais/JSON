import { get_json } from "../../../utils/functionsReq.js"
import { get_token } from "../../../utils/getToken.js"
import { formatedDate } from "../../../utils/general.js"
import { InteractorPersonalization } from "../view-personalization/interactor.js"
import { API } from "../../../utils/endPoints.js"
import { modal } from "../../../utils/modals_views.js"

export class InteractorProfileUser {

    constructor() {

        this.get_infos_from_user()
        this.view_page_personalization()

    }

    async get_infos_from_user() {

        const token = get_token()
        const response = await get_json(API.url_get_user, token)

        if (!response.ok) {
            console.log('Ocorreu algum erro ao pegar as informações do usuário')

            return false
        }


        this.builder_profile(response.responseData)
    }

    builder_profile(infos) {
        let description_pattern = "Adicione alguma descrição ao seu perfil!"

        const trim_description = infos.description.trim()

        if (trim_description != "") {

            description_pattern = infos.description

        }

        const date_formated = formatedDate(infos.createdAt)

        const name = document.querySelector('#user-name')

        const date_created = document.querySelector('#info-since')
        const conexion = document.querySelector('#info-connections')
        const ranking = document.querySelector('#info-ranking')

        const task_created = document.querySelector('#info-task-created')
        const task_finished = document.querySelector('#info-task-finished')
        const task_canceled = document.querySelector('#info-task-canceled')

        const description = document.querySelector('#text-user-description')

        name.innerHTML = infos.name
        date_created.innerHTML = date_formated
        conexion.innerHTML = 0
        ranking.innerHTML = `${infos.ranking}º`

        task_created.innerHTML = infos.persistStatistic.created
        task_finished.innerHTML = infos.persistStatistic.finished
        task_canceled.innerHTML = infos.persistStatistic.canceled

        description.innerHTML = description_pattern
    }

    view_page_personalization() {

        const btn = document.querySelector('#btn-save-user')

        btn.addEventListener('click', () => {

            history.pushState({}, '', '/personalizations')

            const container = document.querySelector('#view-infos-unique')
            container.innerHTML = modal['personalizations']

            new InteractorPersonalization()

        })
    }
}