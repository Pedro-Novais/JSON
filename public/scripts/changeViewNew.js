import { change_view } from "./utils/changeView.js"

class ChangeView {

    constructor() {

        this.listenner_clicks()

    }

    listenner_clicks() {

        const main = document.querySelector('main')
        const identifier = main.getAttribute('identifier')

        const LINK_PROFILE = document.querySelector('#visit-profile')
        const LINK_LIST = document.querySelector('#visit-list')
        const LINK_RANKING = document.querySelector('#visit-ranking')
        const LINK_OUT = document.querySelector('#logout')

        if(identifier !== "profile"){

            LINK_PROFILE.addEventListener('click', async () => {
    
                await change_view('/profile/user')
            }
            )
        }

        if(identifier != "list"){

            LINK_LIST.addEventListener('click', async () => {
    
                await change_view('/list')
            }
            )
        }

        if(identifier != "ranking"){

            LINK_RANKING.addEventListener('click', async () => {
    
                await change_view('/ranking')
            }
            )
        }

        LINK_OUT.addEventListener('click', async () => {
            //change_view('/sign-out')
        }
        )
    }
}

new ChangeView()