import { pageStatistic, pageConfigText, pageProfile, pageProfileCustomization, pageProfileCustomizationSecurity, pageProfileCustomizationSecurityTwo, pageProfileCustomizationCode } from "./utils/modals.js"
import { boxAlerts, validEmail, validOnlyNumber } from "./utils/utilsInitial.js"
import { updateTaskBack, post, addTaskBack } from "./utils/functionsReq.js"
import { verifyUser } from "./utils/verificationUser.js"

//não esquecer de tirar esse código, apenas para teste da page config 
//interactorProfile()

const apiConfig = "/api/user/config"
const apiCreateCode = "/api/confirmation"
const apiVeirfyCode = "/api/verify"
const apiChangeUser = "/api/user"
const apiChangeUserSecurity = "/api/user/security"

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

    let valuesFromUser = {}

    function viewProfilePersonalization(determinate = null) {

        if (determinate != 1) {

            valuesFromUser = {}
        }

        div.remove()

        div.setAttribute('class', 'container-personalization-infos-user')


        div.innerHTML = pageProfileCustomization
        viewPage.appendChild(div)

        const btnBack = document.querySelector('#icon-back')
        const btnSave = document.querySelector('#btn-customization')



        btnBack.addEventListener('click', viewProfile)
        btnSave.addEventListener('click', updateUser)

        insertProfilePersonalization(valuesFromUser)
    }

    async function updateUser() {

        console.log(valuesFromUser)

        verifyModifiedOpen()

    }

    function insertProfilePersonalization(valuesFromUser) {
        const boxCustomization = document.querySelectorAll('.box-view-info-icon')

        for (let i = 0; i < boxCustomization.length; i++) {

            const div = document.createElement('div')

            div.setAttribute('class', 'box-info-to-edit')

            const icon = createIcon('svg/pen-to-square-solid.svg')

            boxCustomization[i].appendChild(div)
            boxCustomization[i].appendChild(icon)

            definedActions(i, div, icon, boxCustomization[i], valuesFromUser)
        }
    }

    function definedActions(index, div, icon, box, valuesFromUser) {

        if (index == 0) {

            if (valuesFromUser.name) {

                div.innerHTML = valuesFromUser.name
            }
            else {

                div.innerHTML = infosAboutUser.name

            }

            actionIcon(icon, div, box, 'name', valuesFromUser)

        }
        else if (index == 1) {

            if (valuesFromUser.description) {

                div.innerHTML = valuesFromUser.description
            }
            else {

                div.innerHTML = infosAboutUser.description

            }

            actionIcon(icon, div, box, 'description', valuesFromUser)

        }
        else if (index == 2) {

            if (valuesFromUser.email) {

                div.innerHTML = valuesFromUser.email
            }
            else {

                div.innerHTML = infosAboutUser.email

            }

            actionIcon(icon, div, box, 'email', valuesFromUser)

        }
        else if (index == 3) {

            div.innerHTML = "**********"

            actionIcon(icon, div, box, 'password', valuesFromUser)

        }
    }

    function actionIcon(icon, divParams, box, type, newValues) {

        if (type == "name" || type == "description") {

            icon.addEventListener('click', () => {


                const input = createInputPersonalization(type)

                if (newValues[type]) {
                    input.value = newValues[type]

                } else {

                    input.value = infosAboutUser[type]
                }


                divParams.style.display = "none"
                icon.style.display = "none"

                const iconCheck = createIcon('/svg/check-solid.svg', 1)
                iconCheck.setAttribute('id', type)

                box.appendChild(input)
                box.appendChild(iconCheck)

                input.focus()

                iconCheck.addEventListener('click', () => {

                    const newValue = input.value

                    if (newValue == "") {
                        const alert = document.querySelector(`#value-${type}-personalization`)
                        alert.style.borderBottomColor = 'red'
                        return false
                    }

                    input.remove()
                    iconCheck.remove()

                    divParams.style.display = "flex"
                    icon.style.display = "flex"

                    divParams.innerHTML = newValue

                    if (newValue !== infosAboutUser[type]) {
                        newValues[type] = newValue
                    }

                    if (type == "password") {
                        divParams.innerHTML = "************"
                    }

                })
            })

        } else if (type == "email" || type == "password") {

            icon.addEventListener('click', () => {

                const verify = verifyModifiedOpen()

                if (verify == "invalid") {

                    return false

                }

                div.remove()

                div.setAttribute('class', 'container-personalization-modal')

                div.innerHTML = pageProfileCustomizationSecurityTwo
                viewPage.appendChild(div)

                definedTitleSecurity(type)

                definedActionSecurity(type)

            })
        }
    }

    function verifyModifiedOpen() {

        const boxIcons = document.querySelectorAll('[mark]')
        let invalid;

        for (let i = 0; i < boxIcons.length; i++) {

            let verifiedCheck = boxIcons[i].getAttribute('id')

            if (verifiedCheck) {

                const alert = document.querySelector(`#value-${verifiedCheck}-personalization`)
                alert.style.borderBottomColor = 'red'

                invalid = 1

            }
        }

        if (invalid == 1) {

            console.log('Finalize a edição das informações')
            return "invalid"

        } else if (Object.keys(valuesFromUser).length == 0) {

            console.log('Nenhuma alteração foi realizada')
            return false

        }
        return true
    }

    function definedTitleSecurity(type) {

        const titleInputs = document.querySelectorAll('.title-input-personalization')

        const titleContainer = document.querySelector('.style-to-title')

        if (type == "email") {
            titleContainer.innerHTML = `Alteração do email`

            titleInputs[0].innerHTML = "Email atual:"
            titleInputs[1].innerHTML = "Novo email:"
            titleInputs[2].innerHTML = "Confirme o email:"

        }
        else if (type == "password") {

            titleContainer.innerHTML = `Alteração da senha`

            titleInputs[0].innerHTML = "Senha atual:"
            titleInputs[1].innerHTML = "Nova senha:"
            titleInputs[2].innerHTML = "Confirme a senha:"
        }
    }

    function definedActionSecurity(type) {

        const btnUpdateSecurity = document.querySelector('#btn-customization-security')
        const btnBack = document.querySelector('#icon-back')

        btnUpdateSecurity.addEventListener('click', () => {

            verifyNewInfoSecurity(type)

        })

        btnBack.addEventListener('click', () => {

            viewProfilePersonalization(1)

        })
    }

    async function verifyNewInfoSecurity(type) {

        focusInput()

        let invalid = 0

        const listElement = [document.querySelector('#actual'), document.querySelector('#new'), document.querySelector('#confirmation')]

        clearBorderRed(listElement)
        
        for (let i = 0; i < listElement.length; i++) {

            if (listElement[i].value == "") {

                listElement[i].style.borderBottomColor = "red"

                invalid = -1
            }
        }

        if (invalid !== 0) {

            return boxAlerts("É necessário preencher todos os campos", ".box-alert-personalization", 5000)

        }

        if (type == "email") {

            for (let i = 0; i < listElement.length; i++) {

                const verify = validEmail(listElement[i].value)

                if (!verify) {
                    listElement[i].style.borderBottomColor = "red"

                    invalid = 1
                }
            }

            if (invalid !== 0) {

                return boxAlerts("O formato de email inserido está incorreto", ".box-alert-personalization", 5000)

            }

            let emailActual;

            if (valuesFromUser.email) {

                emailActual = valuesFromUser.email

            } else {

                emailActual = infosAboutUser.email

            }

            if (listElement[0].value !== emailActual) {

                listElement[0].style.borderBottomColor = "red"

                return boxAlerts("Email atual está incorreto", ".box-alert-personalization", 5000)
            }

            if (listElement[1].value !== listElement[2].value) {

                listElement[1].style.borderBottomColor = "red"
                listElement[2].style.borderBottomColor = "red"

                return boxAlerts("Email's digitados não coincidem", ".box-alert-personalization", 5000)
            }

            const data = {
                email: listElement[1].value
            }

            const response = await post(apiCreateCode, data)

            if (!response.ok) {

                listElement[1].style.borderBottomColor = "red"
                listElement[2].style.borderBottomColor = "red"

                return boxAlerts(response.responseData.msg, ".box-alert-personalization", 10000)

            } else if (response.ok) {

                viewModalCode(data)

            }

        }

        if (type == "password") {

            if (listElement[1].value !== listElement[2].value) {

                listElement[1].style.borderBottomColor = "red"
                listElement[2].style.borderBottomColor = "red"

                return boxAlerts("Senhas digitadas não coincidem", ".box-alert-personalization", 5000)
            }

            const passwordSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(listElement[1].value)
            const passwordNumber = /\d/.test(listElement[1].value);

            if (listElement[1].value.length < 7) {

                listElement[1].style.borderBottomColor = "red"
                listElement[2].style.borderBottomColor = "red"

                return boxAlerts("Sua senha precisa conter mais de 7 caracteres", '.box-alert-personalization', 5000)
            }

            if (!passwordSymbol || !passwordNumber) {

                listElement[1].style.borderBottomColor = "red"
                listElement[2].style.borderBottomColor = "red"

                return boxAlerts("Sua senha precisa conter números e símbolos", '.box-alert-personalization', 5000)
            }

            const data = {
                password: listElement[0].value
            }

            const token = localStorage.getItem('token')

            const response = await addTaskBack(apiChangeUserSecurity, data, token)
         
            if(!response.ok){

                listElement[0].style.borderBottomColor = "red"
                return boxAlerts(response.responseData.msg, '.box-alert-personalization', 5000)

            }else if(response.ok){

                const newData = {
                    password: listElement[1].value
                }
                const response = await updateTaskBack(apiChangeUser, null, newData, 2, token)

                if(!response.ok){
                    
                    boxAlerts(response.responseData.msg, '.box-alert-personalization', 5000)

                    return setTimeout(() => {
                        viewProfilePersonalization(1)
                    }, 5000)

                }else{

                    boxAlerts("Senha alterada com sucesso", '.box-alert-personalization', 5000)
    
                    return setTimeout(() => {
                        viewProfilePersonalization(1)
                    }, 1000)

                }
            }

        }

    }

    function clearBorderRed(element){

        for(let i = 0; i < element.length; i++){

            element[i].style.borderBottomColor = "#0487D9"
        }
    }

    function viewModalCode(data) {

        const container = document.querySelector('.modal-personalizations')
        const boxToOut = document.querySelectorAll('.box-customization-security')
        const btnSendEmail = document.querySelector('#btn-customization-security')

        btnSendEmail.style.display = "none"

        for (let i = 0; i < boxToOut.length; i++) {

            boxToOut[i].style.display = "none"

        }


        container.insertAdjacentHTML('afterbegin', pageProfileCustomizationCode)

        boxAlerts(`O código de confirmação foi enviado ao email: ${data.email}`, "#alert-code", 100000)

        const btnSendCode = document.querySelector('#btn-verify-code-personalization')
        const btnBackToEmail = document.querySelector('#back-page-email')
        const reSendCode = document.querySelector('#send-code-again')

        focusInput()

        btnSendCode.addEventListener('click', () => {
            verifyCode(data)
        })

        reSendCode.addEventListener('click', async () => {

            const response = await post(apiCreateCode, data)

            if (!response.ok) {

                return boxAlerts(response.responseData.msg, ".box-alert-personalization", 10000)

            } else if (response.ok) {

                return boxAlerts(`Um novo código de confirmação foi enviado ao email: ${data.email}`, ".box-alert-personalization", 10000)

            }
        })

        btnBackToEmail.addEventListener('click', () => {

            const modalRemove = document.querySelector('#modal-code')
            modalRemove.remove()

            btnSendEmail.style.display = "flex"

            for (let i = 0; i < boxToOut.length; i++) {

                boxToOut[i].style.display = "flex"

            }
        })
    }

    async function verifyCode(data) {
        const code = document.querySelector('#code')

        if (code.value == "") {

            code.style.borderBottomColor = "red"
            return boxAlerts(`Insira o código que foi enviado ao email: ${data.email}`, "#alert-code", 100000)

        }

        const verifyCode = validOnlyNumber(code.value)

        if (!verifyCode) {

            code.style.borderBottomColor = "red"
            return boxAlerts(`O código inserido está incorreto`, "#alert-code", 10000)

        }

        const dataCode = {
            email: data.email,
            code: code.value
        }

        const response = await post(apiVeirfyCode, dataCode)

        if (!response.ok) {

            return boxAlerts(response.responseData.msg, "#alert-code", 10000)

        } else if (response.ok) {

            const token = localStorage.getItem('token')

            const response = await updateTaskBack(apiChangeUser, null, data, 2, token)

            if (!response.ok) {

                boxAlerts("Ocorreu um erro inesperado ao atualizar seu email", "#alert-code", 10000)

            } else if (response.ok) {

                boxAlerts("Email alterado com sucesso", "#alert-code", 10000)

                valuesFromUser.email = data.email

                setTimeout(() => {
                    viewProfilePersonalization(1)
                }, 1000)

            }

        }

    }

    function focusInput() {
        const listElement = [document.querySelector('#actual'), document.querySelector('#new'), document.querySelector('#confirmation'), document.querySelector('#code')]

        for (let i = 0; i < listElement.length; i++) {

            if (listElement[i]) {

                listElement[i].addEventListener('focus', () => {

                    listElement[i].style.borderBottomColor = "#0487D9"

                })

            }
        }
    }

    function createInputPersonalization(type) {

        const input = document.createElement('input')

        input.setAttribute('type', 'text')
        input.setAttribute('name', type)
        input.setAttribute('class', 'inputs-personalization')
        input.setAttribute('id', `value-${type}-personalization`)

        return input
    }

    function createIcon(type, determinate = null) {

        const icon = document.createElement('img')
        icon.setAttribute('src', type)

        if (determinate == 1) {
            icon.setAttribute('mark', 'active')
        }

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
