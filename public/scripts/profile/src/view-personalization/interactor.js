import {change_view} from "../../../utils/changeView.js"
import { API } from "../../../utils/endPoints.js"

class InteractorPersonalization{

    constructor(){
        this.action_btn_back()
    }

    action_btn_back(){

        const btn = document.querySelector('#icon-back')

        btn.addEventListener('click', () =>{

            change_view(API.url_view_profile)
        })
    }
}

new InteractorPersonalization()