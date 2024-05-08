import { change_view } from "./utils/changeView.js"
import { InteractorList } from "./list/interactorList.js"
import { InteractorProfile } from "./profile/interectorProfile.js"
import { InteractorRanking } from "./ranking/interactorRanking.js"

export class ChangeView {

    constructor() {

        this.listenner_clicks()

    }

    listenner_clicks() {

        const LINK_PROFILE = document.querySelector('#visit-profile')
        const LINK_LIST = document.querySelector('#visit-list')
        const LINK_RANKING = document.querySelector('#visit-ranking')
        const LINK_OUT = document.querySelector('#logout')

        LINK_PROFILE.addEventListener('click', async () => {

            const url = await change_view('/profile')
            new InteractorProfile(url)

        }
        )

        LINK_LIST.addEventListener('click', async () => {
            const url = await change_view('/list')
            new InteractorList(url)
        }
        )

        LINK_RANKING.addEventListener('click', async () => {
            const url = await change_view('/ranking')
            new InteractorRanking(url)
        }
        )

        LINK_OUT.addEventListener('click', async () => {
            //change_view('/sign-out')
        }
        )
    }
}

new ChangeView()