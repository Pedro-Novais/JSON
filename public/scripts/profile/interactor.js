import { mark_header } from "../utils/markHeader.js"
import { modal } from "../utils/modals_views.js"
import { InteractorProfileUser } from "./src/view-profile/interactor.js"
import { InteractorPersonalization } from "./src/view-personalization/interactor.js"
import { InteractorStatistic } from "./src/view-statistic/interactor.js"
import { InteractorConfiguration } from "./src/view-config/interactor.js"

export class InteractorProfile {

    constructor() {

        mark_header('profile')
        this.insert_view()
        this.listenner_clicks()
    }

    listenner_clicks() {

        const SECTION_PROFILE = document.querySelector('#section-profile')
        const SECTION_STATISTIC = document.querySelector('#section-statistic')
        const SECTION_CONFIG = document.querySelector('#section-config')


        SECTION_PROFILE.addEventListener('click', async () => {
            const element = document.querySelector('[identifier-profile]')
            const identifier = element.getAttribute('identifier-profile')

            if (identifier !== 'profile') {

                history.pushState({}, '', 'profile')

                this.insert_view()
            }
        })



        SECTION_STATISTIC.addEventListener('click', async () => {

            const element = document.querySelector('[identifier-profile]')
            const identifier = element.getAttribute('identifier-profile')

            if (identifier !== 'statistic') {

                history.pushState({}, '', 'statistic')

                this.insert_view()
            }
        })



        SECTION_CONFIG.addEventListener('click', async () => {

            const element = document.querySelector('[identifier-profile]')
            const identifier = element.getAttribute('identifier-profile')

            if (identifier !== 'config') {

                history.pushState({}, '', 'configurations')

                this.insert_view()
            }
        })

    }

    insert_view() {

        const dir = window.location.pathname
        const container = document.querySelector('#view-infos-unique')

        if (container) {

            if (dir == '/profile') {

                container.innerHTML = modal['user']
                new InteractorProfileUser()

            }
            else if (dir == '/statistic') {

                container.innerHTML = modal['statistic']
                new InteractorStatistic()
            }
            else if (dir == '/configurations') {

                container.innerHTML = modal['config']
                new InteractorConfiguration()
            }
            else if (dir == '/personalizations') {

                history.pushState({}, '', dir)

                container.innerHTML = modal['personalizations']
                new InteractorPersonalization()
            }
        }
    }
}