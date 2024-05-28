import { change_view } from "./utils/changeView.js"
import { API } from "./utils/endPoints.js"

export class ChangeView {

    constructor(identifier, container) {

        const element = document.querySelector(container)
        this.listenner_clicks(identifier, element)

    }

    listenner_clicks(identifier, container) { 

        const LINK_PROFILE = document.querySelector('#visit-profile')
        const LINK_LIST = document.querySelector('#visit-list')
        const LINK_RANKING = document.querySelector('#visit-ranking')
        const LINK_OUT = document.querySelector('#logout')

        if (identifier !== "profile") {

            LINK_PROFILE.addEventListener('click', async () => {

                const tasks = document.querySelectorAll('.tasks')

                tasks.forEach(element => {

                    element.remove()
                })

                container.remove()
                change_view(API.url_view_profile)
            }
            )
        }

        if (identifier !== "list") {

            LINK_LIST.addEventListener('click', async () => {

                container.remove()
                change_view(API.url_view_list)
            }
            )
        }

        if (identifier !== "ranking") {

            LINK_RANKING.addEventListener('click', async () => {

                const ranking = document.querySelectorAll('.position-users')

                ranking.forEach(element => {

                    element.remove()
                })

                container.remove()
                change_view(API.url_view_ranking)
            }
            )
        }

        LINK_OUT.addEventListener('click', async () => {
            //change_view('/sign-out')
        }
        )
    }
}