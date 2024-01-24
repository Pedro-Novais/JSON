import { pageStatistic, pageConfigText } from "./utils/modals.js"
import { getConfig, updateTaskBack } from "./utils/functionsReq.js"

//não esquecer de tirar esse código, apenas para teste da page config 
//interactorProfile()

export function interactorProfile() {

    let activeHover = null;

    let arrayStatistic = [];
    let statisticData;

    let statisticAll = {
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

    setTimeout(initial, 50)

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

        insertStatistic(3)
        getPriorityStatistic()
        clickPriorityStatistic(3)
        hoverPriority()

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
        insertStatistic(3)
        getPriorityStatistic()
        clickPriorityStatistic(3)
        hoverPriority()

        profile.addEventListener('click', viewProfile)
        pageConfig.addEventListener('click', viewConfig)
    }

    function insertStatistic(priority) {

        let numberCreate = document.querySelector('#statistic-created')
        let numberFinished = document.querySelector('#statistic-finished')
        let numberCanceled = document.querySelector('#statistic-canceled')

        numberCreate.innerHTML = arrayStatistic[priority].created
        numberFinished.innerHTML = arrayStatistic[priority].finished
        numberCanceled.innerHTML = arrayStatistic[priority].canceled

        insertStatisticBars(priority)
    }

    function insertStatisticBars(priority){

        const barFinished = document.querySelector('#bar-task-finished')
        const barCanceled = document.querySelector('#bar-task-canceled')
        
        const numberFinished = document.querySelector('#number-finished')
        const numberCanceled = document.querySelector('#number-canceled')

        let tasksFinished = arrayStatistic[priority].finished
        let tasksCanceled = arrayStatistic[priority].canceled
        let allTasks = tasksFinished + tasksCanceled

        tasksFinished = (tasksFinished / allTasks) * 100
        tasksCanceled = (tasksCanceled / allTasks) * 100

       barFinished.style.width = `${tasksFinished.toFixed(2)}%`
       barCanceled.style.width = `${tasksCanceled.toFixed(2)}%`

       numberFinished.innerHTML = `Tasks Concluídas: ${tasksFinished.toFixed(0)}%`
       numberCanceled.innerHTML = `Tasks Canceladas: ${tasksCanceled.toFixed(0)}%`

    }

    function viewConfigChange() {
        let changeStateConfig = document.querySelectorAll('.ball-option')

        for (let i = 0; i < 2; i++) {
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
            stateChange.style.backgroundColor = "green"
        }
        else if (stateActual == 1) {

            childChange.style.left = "unset"
            stateChange.setAttribute('state', "0")
            stateChange.style.backgroundColor = "red"
        }
    }

    async function sendConfigInfo() {
        let changeStateConfig = document.querySelectorAll('.ball-option')
        let state = [];

        for (let i = 0; i < changeStateConfig.length; i++) {
            let stateFormatation = changeStateConfig[i].getAttribute('state')

            if (stateFormatation == 0) {
                state[i] = false
            } else if (stateFormatation == 1) {
                state[i] = true
            }
        }
  
        let data = {
            orderPriority: state[0],
            usersCanViewProfile: state[1]
        }
        try {
            const responseUpdate = await updateTaskBack(apiConfig, null, data, 2)
        } catch (err) {
            console.log(err)
        }
    }

    function getInfoConfig(json) {
        config = json
    }

    function getInfoStatistic(json) {
        statisticData = json.reverse()
        getAllInfo()
    }

    function getAllInfo() {
        let numberBase;
        for (let i = 0; i < statisticData.length; i++) {

            numberBase = statisticAll.created;
            statisticAll.created = statisticData[i]["created"] + numberBase

            numberBase = statisticAll.finished
            statisticAll.finished = statisticData[i]["finished"] + numberBase

            numberBase = statisticAll.canceled
            statisticAll.canceled = statisticData[i]["canceled"] + numberBase
        }

        for (let i = 0; i < 4; i++) {
            if (i == 3) {
                arrayStatistic.push(statisticAll)
                break
            }
            arrayStatistic.push(statisticData[i])
        }
    }

    function getPriorityStatistic() {
        const level = document.querySelectorAll('.choose-priority-statistic')

        level.forEach(function (lvl) {
            lvl.addEventListener('click', function () {
                clearNewClickStatistic()
                let priorityId = lvl.getAttribute('id');
                if (priorityId == "priority-one") {
                    priorityId = 0
                    activeHover = 0

                }
                else if (priorityId == "priority-two") {
                    priorityId = 1
                    activeHover = 1

                }
                else if (priorityId == "priority-three") {
                    priorityId = 2
                    activeHover = 2

                }
                else if (priorityId == "priority-all") {
                    priorityId = 3
                    activeHover = 3
                }

                insertStatistic(priorityId)
                clickPriorityStatistic(priorityId)

            });
        });
    }

    function clickPriorityStatistic(priority) {
        const level = document.querySelectorAll('.choose-priority-statistic')

        if (priority !== 3) {
            for (let i = 0; i <= priority; i++) {
                level[i].style.backgroundColor = "#05DBF2"
            }
        } else {
            level[3].style.backgroundColor = "#05DBF2"
            console.log('cliquei', activeHover)
        }
    }

    function clearNewClickStatistic() {
        const level = document.querySelectorAll('.choose-priority-statistic')
        for (let i = 0; i < level.length; i++) {
            level[i].style.backgroundColor = '#0487D9';
        }
    }

    function hoverPriority() {
        const level = document.querySelectorAll('.choose-priority-statistic')
        let levelHover;

        level.forEach(function (lvl) {
            lvl.addEventListener('mouseenter', function () {
                levelHover = lvl.getAttribute('id')
                console.log('indo')
                if (levelHover !== "priority-all") {

                    if (levelHover == "priority-one") {
                        console.log(levelHover)
                        level[0].style.backgroundColor = '#05DBF2';
                        level[0].addEventListener('mouseleave', outHover)
        
                    }

                    if (levelHover == "priority-two") {
                        for(let i = 0; i < 2; i++){

                            level[i].style.backgroundColor = '#05DBF2';
                            
                        }
                        level[1].addEventListener('mouseleave', outHover)
                    }

                    if (levelHover == "priority-three") {
                        for(let i = 0; i < 3; i++){

                            level[i].style.backgroundColor = '#05DBF2';
                            
                        }
                        level[2].addEventListener('mouseleave', outHover)
                    }
                }
            })
        })
    }

    function outHover() {
        const level = document.querySelectorAll('.choose-priority-statistic')

        for (let i = 0; i < 3; i++) {
            level[i].style.backgroundColor = "#0487d9"

            if (activeHover !== null && activeHover !== 3) {

                for (let i = 0; i <= activeHover; i++) {
                    level[i].style.backgroundColor = "#05DBF2"
                }
            }
        }
    }
}
