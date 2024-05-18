import { get_json } from "../../../utils/functionsReq.js"
import { get_token } from "../../../utils/getToken.js"

const api_statistic = "/api/user/statistic"

class Interactorstatistic {

    constructor() {

        this.get_statistic()

    }

    async get_statistic() {

        const token = get_token()
        const response = await get_json(api_statistic, token)

        if (!response.ok) {

            console.log('erro ao requisitar as estatísticas')

            return false
        }

        const statistic_all = this.builder_all_statistic(response.responseData)

        this.builder_statistic(statistic_all)
        this.priority_action_statistic(response.responseData, statistic_all)
    }

    builder_statistic(statistic) {

        const statistic_create = document.querySelector('#statistic-created')
        const statistic_finished = document.querySelector('#statistic-finished')
        const statistic_canceled = document.querySelector('#statistic-canceled')

        statistic_create.innerHTML = statistic.created
        statistic_finished.innerHTML = statistic.finished
        statistic_canceled.innerHTML = statistic.canceled
    }

    priority_action_statistic(priority, priority_all) {

        const priority_statistic_element = document.querySelectorAll('.choose-priority-statistic')

        priority_statistic_element.forEach(element => {

            element.addEventListener('click', () => {
              
                const priority_id = element.getAttribute('id')

                if (priority_id != "priority-all") {

                    this.builder_statistic(priority[priority_id])
                } else {
                
                    this.builder_statistic(priority_all)
                }
            })
        })
    }

    builder_all_statistic(statistics) {

        let statistic_all = {
            created: 0,
            finished: 0,
            canceled: 0
        }

        const array_types_priority = ['priorityOne', 'priorityTwo', 'priorityThree']
        const array_types = ['created', 'finished', 'canceled']

        for (let i = 0; i < 3; i++) {

            for (let i_intern = 0; i_intern < 3; i_intern++) {

                statistic_all[array_types[i_intern]] += statistics[array_types_priority[i]][array_types[i_intern]]

            }
        }

        return statistic_all
    }

    priority_statistic_hover(){

    }
}

new Interactorstatistic()