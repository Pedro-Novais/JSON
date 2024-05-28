import { get_render, get_json } from "../utils/functionsReq.js";
import { get_token } from "../utils/getToken.js";
import { modal } from "./modals_obj.js";

export async function change_view(endpoint) {

    const page = convert_url_to_params(endpoint)

    console.log(page)

    history.pushState({}, '', endpoint)

}

function convert_url_to_params(url){

    if(url == '/list'){

        return 'list'
    }

    else if(url == '/ranking'){

        return 'ranking'
    }

    else if(url == '/profile/user'){

        return 'profile'
    }

    else if(url == '/profile/statistic'){

        return 'statistic'
    }

    else if(url == '/profile/configurations'){

        return 'config'
    }
}