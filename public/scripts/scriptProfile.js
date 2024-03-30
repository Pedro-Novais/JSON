import { pageStatistic, pageConfigText, pageProfile, pageProfileCustomization } from "./utils/modals.js"
import { boxAlerts } from "./utils/utilsInitial.js"
import { updateTaskBack } from "./utils/functionsReq.js"
import { verifyUser } from "./utils/verificationUser.js"

//não esquecer de tirar esse código, apenas para teste da page config 
//interactorProfile()

const apiConfig = "/api/user/config"

export async function interactorProfile() {

    //const responseVerificationUser = await verifyUser()
    //console.log(responseVerificationUser)

    let activeHover = null;

    let arrayStatistic = [];

    let statisticAll = {
        created: 0,
        finished: 0,
        canceled: 0
    };

    let nameConfig = ["orderPriority", "usersCanViewStatistic"]

    let responseVerificationUser;
    let infosAboutUser = {};
    let statisticJson;
    let configJson;

    await getUserInfo()
    getAllInfoStatistic()

    const viewPage = document.querySelector('#view-infos-unique')
    const profile = document.querySelector('#section-profile')
    const statistic = document.querySelector('#section-statistic')
    const pageConfig = document.querySelector('#section-config')

    const div = document.createElement('div')

    initial()

    async function getUserInfo() {
        responseVerificationUser = await verifyUser()
    
        infosAboutUser.name = responseVerificationUser.responseData.name
        infosAboutUser.email = responseVerificationUser.responseData.email
        infosAboutUser.statistic = responseVerificationUser.responseData.persistStatistic
        infosAboutUser.description = responseVerificationUser.responseData.description
        infosAboutUser.dateCreation = responseVerificationUser.responseData.createdAt

        statisticJson = responseVerificationUser.responseData.statistic
        configJson = responseVerificationUser.responseData.configurations

    }

    function viewProfile() {
        div.remove()

        div.setAttribute('class', 'container-profile-user')

        div.innerHTML = pageProfile;
        viewPage.appendChild(div)

        insertInfosUser()

        const btnUpdate = document.querySelector('#btn-save-user')

        btnUpdate.addEventListener('click', viewProfilePersonalization)

        profile.removeEventListener('click', viewProfile)
        statistic.addEventListener('click', viewStatistic)
        pageConfig.addEventListener('click', viewConfig)
    }

    function viewProfilePersonalization(){
        div.remove()
        
        div.setAttribute('class', 'container-personalization-infos-user')


        div.innerHTML = pageProfileCustomization
        viewPage.appendChild(div)

        const btnBack = document.querySelector('#icon-back')

        btnBack.addEventListener('click', viewProfile)

        insertProfilePersonalization()
    }

    function insertProfilePersonalization(){
        const boxCustomization = document.querySelectorAll('.box-view-info-icon')
        
        for(let i = 0; i < boxCustomization.length; i++){

            const div = document.createElement('div')
            //const icon = document.createElement('img')

            div.setAttribute('class', 'box-info-to-edit')

            const icon = createIcon('svg/pen-to-square-solid.svg')
            //icon.setAttribute('src', 'svg/pen-to-square-solid.svg')

            boxCustomization[i].appendChild(div)
            boxCustomization[i].appendChild(icon)

            definedActions(i, div, icon, boxCustomization[i])
        }
    }

    function definedActions(index, div, icon, box){
        if(index == 0){

            div.innerHTML = infosAboutUser.name

            actionIcon(icon, div, box, 'name')

        }
        else if(index == 1){

            div.innerHTML = infosAboutUser.description
            icon.setAttribute('mark', 'description')

            actionIcon(icon, div, box, 'description')

        }
        else if(index == 2){

            div.innerHTML = infosAboutUser.email
            icon.setAttribute('mark', 'email')

            actionIcon(icon, div, box, 'email')

        }
        else if(index == 3){

            div.innerHTML = "**********"
            icon.setAttribute('mark', 'password')

            actionIcon(icon, div, box, 'password')
            
        }
    }

    function actionIcon(icon, div, box, type){
        icon.addEventListener('click', () => {

            const input = createInputPersonalization(type)
            input.value = infosAboutUser[type]

            div.style.display = "none"
            icon.style.display = "none"

            const iconCheck = createIcon('/svg/check-solid.svg')

            box.appendChild(input)
            box.appendChild(iconCheck)

            input.focus()

            iconCheck.addEventListener('click', () =>{

                const newValue = input.value
                
                input.remove()
                iconCheck.remove()

                div.style.display = "flex"
                icon.style.display = "flex"

                div.innerHTML = newValue
            })
        })
    }

    function createInputPersonalization(type){
        //<input type="text" name="description" class="inputs-personalization" id="value-description-personalization"></input>
        const input = document.createElement('input')

        input.setAttribute('type', 'text')
        input.setAttribute('name', type)
        input.setAttribute('class', 'inputs-personalization')
        input.setAttribute('id', `value-${type}-personalization`)

        return input
    }

    function createIcon(type){

        const icon = document.createElement('img')
        icon.setAttribute('src', type)

        return icon
    }

    function viewStatistic() {
        div.remove()

        div.setAttribute('class', 'container-statistic')

        div.innerHTML = pageStatistic;

        viewPage.appendChild(div)

        activeHover = null
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
        div.setAttribute('class', 'container-config')

        div.innerHTML = pageConfigText;

        viewPage.appendChild(div)

        let changeStateConfig = document.querySelectorAll('.ball-option')
        let btnSendConfig = document.querySelector('#btn-save-configs')

        viewConfigChange()

        changeStateConfig.forEach(function (btn) {
            btn.addEventListener('click', function () {

                let idConfig = btn.getAttribute('id')
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

    function insertInfosUser() {
        const name = document.querySelector('#user-name')

        const dateCreated = document.querySelector('#info-since')
        const conexion = document.querySelector('#info-connections')
        const ranking = document.querySelector('#info-ranking')

        const taskCreated = document.querySelector('#info-task-created')
        const taskFinished = document.querySelector('#info-task-finished')
        const taskCanceled = document.querySelector('#info-task-canceled')

        const description = document.querySelector('#text-user-description')

        name.innerHTML = infosAboutUser.name

        const date = formatedDate(infosAboutUser.dateCreation)
        dateCreated.innerHTML = date
        conexion.innerHTML = " - "
        ranking.innerHTML = " - "

        taskCreated.innerHTML = infosAboutUser.statistic.taskCreated
        taskFinished.innerHTML = infosAboutUser.statistic.taskFinished
        taskCanceled.innerHTML = infosAboutUser.statistic.taskCanceled

        let descriptionValue;

        if (infosAboutUser.description == " ") {

            descriptionValue = " Adicione uma descrição ao seu perfil! "

        } else {
            
            descriptionValue = infosAboutUser.description
            
        }

        description.innerHTML = descriptionValue
    }

    function formatedDate(dateNum) {

        const date = new Date(dateNum);

        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();

        const dateFormated = `${day}/${month}/${year}`;

        return dateFormated

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

    function insertStatisticBars(priority) {

        const barFinished = document.querySelector('#bar-task-finished')
        const barCanceled = document.querySelector('#bar-task-canceled')

        barFinished.style.borderTopRightRadius = "0"
        barFinished.style.borderBottomRightRadius = "0"
        barCanceled.style.borderTopLeftRadius = "0"
        barCanceled.style.borderBottomLeftRadius = "0"

        const numberFinished = document.querySelector('#number-finished')
        const numberCanceled = document.querySelector('#number-canceled')

        let tasksFinished = arrayStatistic[priority].finished
        let tasksCanceled = arrayStatistic[priority].canceled
        let allTasks = tasksFinished + tasksCanceled

        if (tasksFinished == 0 && tasksCanceled == 0) {
            tasksFinished = 0
            tasksCanceled = 0

            barFinished.style.width = `50%`
            barCanceled.style.width = `50%`
        } else {

            tasksFinished = (tasksFinished / allTasks) * 100
            tasksCanceled = (tasksCanceled / allTasks) * 100
            barFinished.style.width = `${tasksFinished.toFixed(2)}%`
            barCanceled.style.width = `${tasksCanceled.toFixed(2)}%`
        }

        numberFinished.innerHTML = `Tasks Concluídas: ${tasksFinished.toFixed(0)}%`
        numberCanceled.innerHTML = `Tasks Canceladas: ${tasksCanceled.toFixed(0)}%`

        if (barFinished.style.width == "100%") {
            barFinished.style.borderTopRightRadius = "0.5rem"
            barFinished.style.borderBottomRightRadius = "0.5rem"

        } else if (barCanceled.style.width == "100%") {
            barCanceled.style.borderTopLeftRadius = "0.5rem"
            barCanceled.style.borderBottomLeftRadius = "0.5rem"
        }

    }

    function viewConfigChange() {
        let changeStateConfig = document.querySelectorAll('.ball-option')

        for (let i = 0; i < 2; i++) {
            let idConfig = changeStateConfig[i].getAttribute('id')
            if (configJson[nameConfig[i]] == true) {
                changeStateConfig[i].setAttribute('state', '0')

            } else if (configJson[nameConfig[i]] == false) {
                changeStateConfig[i].setAttribute('state', '1')
            }
            activeConfig(idConfig)
        }
    }

    function activeConfig(id) {

        let stateChange = document.querySelector(`#${id}`)
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
            usersCanViewStatistic: state[1]
        }

        try {
            const token = localStorage.getItem('token')
            const responseUpdate = await updateTaskBack(apiConfig, null, data, 0, token)

            if (responseUpdate.ok) {

                await getUserInfo()
                viewConfigChange()

                boxAlerts("Configurações salvas com sucesso", ".container-config", 5000)
            }

        } catch (err) {

            return boxAlerts("Ocorreu um erro ao salvar sua configurações", ".container-config", 5000)
          
        }
    }

    function getAllInfoStatistic() {
        let numberBase;
        let nameStatistic = ["priorityOne", "priorityTwo", "priorityThree"]

        for (let i = 0; i < 3; i++) {

            numberBase = statisticAll.created;
            statisticAll.created = statisticJson[nameStatistic[i]].created + numberBase

            numberBase = statisticAll.finished
            statisticAll.finished = statisticJson[nameStatistic[i]].finished + numberBase

            numberBase = statisticAll.canceled
            statisticAll.canceled = statisticJson[nameStatistic[i]].canceled + numberBase
        }

        for (let i = 0; i < 4; i++) {
            if (i == 3) {
                arrayStatistic.push(statisticAll)
                break
            }
            arrayStatistic.push(statisticJson[nameStatistic[i]])
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

                if (levelHover !== "priority-all") {

                    if (levelHover == "priority-one") {
                        level[0].style.backgroundColor = '#05DBF2';
                        level[0].addEventListener('mouseleave', outHover)

                    }

                    if (levelHover == "priority-two") {
                        for (let i = 0; i < 2; i++) {

                            level[i].style.backgroundColor = '#05DBF2';

                        }
                        level[1].addEventListener('mouseleave', outHover)
                    }

                    if (levelHover == "priority-three") {
                        for (let i = 0; i < 3; i++) {

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
