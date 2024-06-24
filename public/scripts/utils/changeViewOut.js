import { modal } from "./modals_views.js";
import { ChangeViewOut } from "../nChangeViewOut.js";

export function change_view(endpoint) { 
    
    history.pushState({}, '', endpoint)

    const script = document.querySelector('[scripttag=true]')
    const script_puted = document.querySelector('[scriptnew=true]')

    if(script){

        script.parentNode.removeChild(script)
    }
    
    if(script_puted){
      
        script_puted.parentNode.removeChild(script_puted)
    }

    const new_script = document.createElement('script')

    const view = convert_url_to_params(endpoint)
    const element_actual = convert_params_id(view)

    const main = document.querySelector('main')
    main.setAttribute('identifier', view)

    main.innerHTML = modal[view]
    
    const timestamp = new Date().getTime();

    new_script.src = `scripts/${view}/exec.js?t=${timestamp}`
    new_script.type = 'module'
    new_script.setAttribute('scriptnew', 'true')

    document.body.appendChild(new_script)

    new ChangeViewOut(view, element_actual)
}

function convert_url_to_params(url) {

    if (url == '/welcome') {

        return 'welcome'
    }

    else if (url == '/login') {

        return 'login'
    }

    else if (url == '/register') {

        return 'register'
    }
}

function convert_params_id(params){

    if(params == 'welcome'){

        return '#welcome'
    }

    if(params == 'login'){

        return '#main-enter'
    }

    if(params == 'register'){

        return '#main-enter'
    }
}