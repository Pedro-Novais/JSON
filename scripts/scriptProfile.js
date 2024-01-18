import { pageStatistic, pageConfigText } from "./utils/modals.js"
import { getConfig, updateTaskBack } from "./utils/functionsReq.js"

//não esquecer de tirar esse código, apenas para teste da page config 
//interactorProfile()

export function interactorProfile() {

    let statisticData;

    let statisticAll ={
        created: 0,
        finished: 0,
        canceled: 0
    };

    let config;
    let nameConfig = ["orderPriority", "usersCanViewProfile"]

    const apiConfig = 'http://localhost:5000/config'
    const apiStatistic = 'http://localhost:5000/statistic'

    getStatisticAndConfig()

    const viewPage = document.querySelector('#view-infos-unique')
    const profile = document.querySelector('#section-profile')
    const statistic = document.querySelector('#section-statistic')
    const pageConfig = document.querySelector('#section-config')

    const div = document.createElement('div')

    setTimeout(initial,50)

    async function getStatisticAndConfig() {
        let StatisticJson = await getConfig(apiStatistic)
        getInfoStatistic(StatisticJson)
        let configJson = await getConfig(apiConfig)
        getInfoConfig(configJson)
    }

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

        insertStatistic()

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
        let btnSendConfig = document.querySelector('#btn-save-configs')

        viewConfigChange()

        changeStateConfig.forEach(function (btn) {
            btn.addEventListener('click', function () {

                let idConfig = btn.getAttribute('id')
                console.log("btn", idConfig)
                activeConfig(idConfig)
            })
        })

        btnSendConfig.addEventListener('click', sendConfigInfo)

        pageConfig.removeEventListener('click', viewConfig)
        profile.addEventListener('click', viewProfile)
        statistic.addEventListener('click', viewStatistic)
    }

    function initial() {
        div.setAttribute('class', 'container-statistic')

        div.innerHTML = pageStatistic;

        viewPage.appendChild(div)
        insertStatistic()

        profile.addEventListener('click', viewProfile)
        pageConfig.addEventListener('click', viewConfig)
    }

    function insertStatistic(){

        let numberCreate = document.querySelector('#statistic-created')
        let numberFinished = document.querySelector('#statistic-finished')
        let numberCanceled = document.querySelector('#statistic-canceled')

        numberCreate.innerHTML = statisticAll.created
        numberFinished.innerHTML = statisticAll.finished
        numberCanceled.innerHTML = statisticAll.canceled

    }

    function viewConfigChange() {
        let changeStateConfig = document.querySelectorAll('.ball-option')

        for(let i = 0; i<2; i++){
            let idConfig = changeStateConfig[i].getAttribute('id')
            if (config[nameConfig[i]] == true) {
                changeStateConfig[i].setAttribute('state', '0')
    
            } else if (config[nameConfig[i]] == false) {
                changeStateConfig[i].setAttribute('state', '1')
            }
            activeConfig(idConfig)
        }
    }

    function activeConfig(id) {

        let stateChange = document.querySelector(`#${id}`)
        console.log(stateChange)
        let stateActual = stateChange.getAttribute('state')
        let childChange = stateChange.querySelector(":first-child");


        if (stateActual == 0) {
            
            childChange.style.left = "44.8%"
            stateChange.setAttribute('state', "1")
            stateChange.style.backgroundColor="green"
        }
        else if(stateActual == 1) {
            
            childChange.style.left = "unset"
            stateChange.setAttribute('state', "0")
            stateChange.style.backgroundColor="red"
        }
    }

    async function sendConfigInfo() {
        let changeStateConfig = document.querySelectorAll('.ball-option')
        let state = [];

        for(let i = 0; i < changeStateConfig.length; i++){
           let stateFormatation = changeStateConfig[i].getAttribute('state')

           if(stateFormatation == 0){
            state[i] = false
           }else if(stateFormatation == 1){
            state[i] = true
           }
        }
        console.log(state)
        let data = {
            orderPriority: state[0],
            usersCanViewProfile: state[1]
        }
        try{
        const responseUpdate = await updateTaskBack(apiConfig, null, data, 2)
        }catch(err){
            console.log(err)
        }
    }

    function getInfoConfig(json) {
        config = json
    }

    function getInfoStatistic(json){
        statisticData = json
        getAllInfo()
    }

    function getAllInfo(){
        let numberBase;
        for(let i = 0; i < statisticData.length; i++){

            numberBase = statisticAll.created;
            statisticAll.created = statisticData[i]["created"] + numberBase

            numberBase = statisticAll.finished
            statisticAll.finished = statisticData[i]["finished"] + numberBase

            numberBase = statisticAll.canceled
            statisticAll.canceled = statisticData[i]["canceled"] + numberBase
        }

        console.log(statisticAll)
        console.log(statisticData[1])
    }
}
