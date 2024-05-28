import { change_view } from "./utils/changeView.js"
import { API } from "./utils/endPoints.js"

export class ChangeView {

    constructor(identifier) {

        this.enabled_events()
        this.listenner_clicks(identifier)

    }

    listenner_clicks(identifier) { 

        const LINK_PROFILE = document.querySelector('#visit-profile')
        const LINK_LIST = document.querySelector('#visit-list')
        const LINK_RANKING = document.querySelector('#visit-ranking')
        const LINK_OUT = document.querySelector('#logout')

        if (identifier !== "profile") {

            LINK_PROFILE.addEventListener('click', this.change_page_profile)

        }

        if (identifier !== "list") {

            LINK_LIST.addEventListener('click', this.change_page_list)
            
        }

        if (identifier !== "ranking") {

            LINK_RANKING.addEventListener('click', this.change_page_ranking)
            
        }

        LINK_OUT.addEventListener('click', async () => {
            //change_view('/sign-out')
        }
        )
    }

    enabled_events(){

        const LINK_PROFILE = document.querySelector('#visit-profile')
        const LINK_LIST = document.querySelector('#visit-list')
        const LINK_RANKING = document.querySelector('#visit-ranking')
        const LINK_OUT = document.querySelector('#logout')

        LINK_PROFILE.removeEventListener('click', this.change_page_profile)
        LINK_LIST.removeEventListener('click', this.change_page_list)
        LINK_RANKING.removeEventListener('click', this.change_page_ranking)

    }

    change_page_profile(){
       
        change_view(API.url_view_profile)

    }

    change_page_list(){

        change_view(API.url_view_list)

    }

    change_page_ranking(){

        change_view(API.url_view_ranking)

    }
}