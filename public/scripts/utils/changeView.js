import { get_render, get_json } from "../utils/functionsReq.js";
import { get_token } from "../utils/getToken.js";
import { modal } from "./modals_views.js";
import { ChangeView } from "../changeViewNew.js";
import { InteractorList } from "../list/interactor.js";
import { InteractorRanking } from "../ranking/interactor.js";

export function change_view(endpoint) {
    debugger
    history.pushState({}, '', endpoint)

    const script = document.querySelector('[scripttag=true]')
    if(script){

        script.remove()
    }

    const view = convert_url_to_params(endpoint)
    const element_actual = convert_params_id(view)

    const main = document.querySelector('main')
    main.setAttribute('identifier', view)

    main.innerHTML = modal[view]

    new ChangeView(view, element_actual)

    if(view == 'list'){

        new InteractorList()

    }

    if(view == 'ranking'){

        new InteractorRanking()
        
    }
}

function convert_url_to_params(url) {

    if (url == '/list') {

        return 'list'
    }

    else if (url == '/ranking') {

        return 'ranking'
    }

    else if (url == '/profile/user') {

        return 'profile'
    }

    else if (url == '/profile/statistic') {

        return 'statistic'
    }

    else if (url == '/profile/configurations') {

        return 'config'
    }
}

function convert_params_id(params){

    if(params == 'list'){

        return '#container'
    }

    if(params == 'ranking'){

        return '#container-ranking'
    }
}