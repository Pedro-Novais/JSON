import { get_json } from '../../utils/functionsReq.js'
import { get_token } from '../../utils/getToken.js'
import { API } from '../../utils/endPoints.js'
import { PopUpGlobal } from '../../utils/popup_global.js'
import { ButtonsActionsRanking } from './btnActions.js'

export class BuilderPositions {

    constructor(users) {

        this.get_data(users)

    }

    async get_data(positions) {

        if (positions == null) {

            const token = get_token()

            const response = await get_json(API.url_ranking, token)

            if (!response.ok) {

                console.error('Algum erro ocorreu ao carregar o ranking')
                new PopUpGlobal('#container-ranking', 'Erro!', 'Algum erro ocorreu ao carregar o ranking!')

                return false
            }

            this.verify_users(response.responseData)

        }
        else {

            this.verify_users(positions)
        }
    }

    verify_users(users) {

        if (users.ranking.length === 0) {

            console.warn('Nenhum usuário está no ranking')

            return false
        }

        users.ranking.forEach(element => {

            this.builder_positions(element)
        });

        new ButtonsActionsRanking().get_data()
    }

    builder_positions(user) {

        const container_ranking = document.querySelector('.users-ranking')

        const position = document.createElement('div')
        position.setAttribute('class', 'position-users')
        position.setAttribute('position', user.position)

        const classBox = ["box-position", "box-name", "box-points"]
        const valueBox = [`${user.position}º`, user.nameUser, `${user.tasksFinished} pts`]

        for (let i = 0; i < 3; i++) {

            const infos = this.insert_infos(i, classBox, valueBox)

            position.appendChild(infos)

        }

        position.setAttribute('name', user.nameUser)

        container_ranking.appendChild(position)
    }

    insert_infos(index, class_name, value) {

        const div = document.createElement('div')

        div.setAttribute('class', class_name[index])
        div.setAttribute('title', 'Visualizar perfil')

        div.innerHTML = value[index]

        return div
    }
}