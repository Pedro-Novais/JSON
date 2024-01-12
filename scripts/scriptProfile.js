import { pageStatistic, pageConfigText } from "./utils/modals.js"
import getConfig from "./utils/config.js"

//não esquecer de tirar esse código, apenas para teste da page config 
//interactorProfile()

export function interactorProfile() {

    let config;

    const apiConfig = 'http://localhost:5000/config'
    getConfig(apiConfig, getInfoConfig)

    const viewPage = document.querySelector('#view-infos-unique')
    const profile = document.querySelector('#section-profile')
    const statistic = document.querySelector('#section-statistic')
    const pageConfig = document.querySelector('#section-config')
    
    const div = document.createElement('div')

    initial()

    function viewProfile() {
        div.remove()

        console.log('profile foi')
        div.setAttribute('class', 'container-statistic')

        div.innerHTML = "Será Adicionada em Breve";

        viewPage.appendChild(div)

        profile.removeEventListener('click', viewProfile)
        statistic.addEventListener('click', viewStatistic)
        pageConfig.addEventListener('click', viewConfig)
    }

    function viewStatistic() {
        div.remove()

        console.log('statistic foi')
        div.setAttribute('class', 'container-statistic')

        div.innerHTML = pageStatistic;

        viewPage.appendChild(div)

        statistic.removeEventListener('click', viewStatistic)
        profile.addEventListener('click', viewProfile)
        pageConfig.addEventListener('click', viewConfig)
    }

    function viewConfig() {
        
        div.remove()
        console.log('config foi')
        div.setAttribute('class', 'container-config')

        div.innerHTML = pageConfigText;

        viewPage.appendChild(div)

        let changeStateConfig = document.querySelectorAll('.ball-option')

        viewConfigChange()

        changeStateConfig.forEach(function (btn){
            btn.addEventListener('click', function(){
                console.log("btn")
                let idConfig = btn.getAttribute('id')

                activeConfig(idConfig)
            })
        })

        pageConfig.removeEventListener('click', viewConfig)
        profile.addEventListener('click', viewProfile)
        statistic.addEventListener('click', viewStatistic)
    }

    function initial(){
        div.setAttribute('class', 'container-statistic')
    
        div.innerHTML = pageStatistic;
    
        viewPage.appendChild(div)
    
        profile.addEventListener('click', viewProfile)
        pageConfig.addEventListener('click', viewConfig)
    }

    function viewConfigChange(){
        console.log(config)
        let changeStateConfig = document.querySelector('.ball-option')
        let idConfig = changeStateConfig.getAttribute('id')

        if(config["orderPriority"] == true){
            changeStateConfig.setAttribute('state', '1')

        }else if (config["orderPriority"] == false){
            changeStateConfig.setAttribute('state', '0')
        }
        activeConfig(idConfig)

    }

    function activeConfig(id){

        let stateChange = document.querySelector(`#${id}`)
        let stateActual = stateChange.getAttribute('state')
        let childChange = stateChange.childNodes[0]
   
        if(stateActual == 1){
            console.log(stateActual)
            childChange.style.left="44.8%"
            stateChange.setAttribute('state', "0")
        }
        else{
            console.log(stateActual)
            childChange.style.left="unset"
            stateChange.setAttribute('state', "1")
        } 
    }

    function getInfoConfig(json) {
        config = json
      }
}
