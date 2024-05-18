import { change_view } from "../utils/changeView.js"
import { mark_header } from "../utils/markHeader.js"

class InteractorProfile{

    constructor(){

        mark_header('profile')
        this.listenner_clicks()
    }

    listenner_clicks(){

        const element = document.querySelector('[identifier-profile]')
        const identifier = element.getAttribute('identifier-profile')

        const SECTION_PROFILE = document.querySelector('#section-profile')
        const SECTION_STATISTIC = document.querySelector('#section-statistic')
        const SECTION_CONFIG = document.querySelector('#section-config')

        if(identifier != "profile"){

            SECTION_PROFILE.addEventListener('click', async () => {

                await change_view(`/profile/user`)

            })
        }
        
        if(identifier != "statistic"){

            SECTION_STATISTIC.addEventListener('click', async () => {

                await change_view(`/profile/statistic`)

            })
        }
        
        if(identifier != "config"){

            SECTION_CONFIG.addEventListener('click', async () => {

                await change_view(`/profile/configurations`)

            })
        }
    }
}

new InteractorProfile()