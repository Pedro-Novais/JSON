import { InteractorList } from "./list/interactor.js"
import { InteractorRanking } from "./ranking/interactor.js"
import { ChangeView } from "./changeViewNew.js"
import { modal } from "./utils/modals_views.js"

class Relocated {

    builder_page() {
        const dir = window.location.pathname

        const dir_name = convert_url_to_params(dir)

        const main = document.querySelector('main')

        if (dir_name == 'list') {
      
            main.setAttribute('identifier', dir_name)
            main.innerHTML = modal[dir_name]

            new ChangeView(dir_name, '#container')
            new InteractorList()

        }

        if (dir_name == 'ranking') {
    
            main.setAttribute('identifier', dir_name)
            main.innerHTML = modal[dir_name]

            new ChangeView(dir_name, '#container-ranking')
            new InteractorRanking()

        }
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

document.addEventListener('DOMContentLoaded', () => {
 
    const instance = new Relocated();

    instance.builder_page()
});