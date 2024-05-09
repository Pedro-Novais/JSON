import { get, addTaskBack } from "../scripts/utils/functionsReq.js"
import { viewOtherProfile } from "./viewOtherProfile.js"

const apiRanking = "/api/ranking"
const apiViewProfile = "/api/view-profile"
const apiSearch = "/api/search"

export async function interactorRanking(mode = null, pExist = null) {

    class Ranking {

        constructor(user) {
            this.userId = user._id
            this.name = user.nameUser
            this.position = user.position
            this.points = user.tasksFinished
        }

    }

    let response;
    let ranking;
    let exist

    if (mode != null) {

        ranking = mode
        exist = pExist

    } else {

        response = await getRanking()

        ranking = response.responseData.ranking
        exist = response.responseData.exist
    }


    console.log(ranking)

    const rankingFormated = createUsersInRanking(ranking)

    clickOfUsers(rankingFormated, exist)

    const btnRecall = document.querySelector('#refresh')

    btnRecall.addEventListener('click', recall)

    const btnSearch = document.querySelector('#search')
    const inputUser = document.querySelector('#input-name-search')

    btnSearch.addEventListener('click', searchUsers)

    async function getRanking() {

        const token = localStorage.getItem('token')
        const ranking = await get(apiRanking, token, 1)

        if (!ranking.ok) {

            console.log('ocorreu um erro ao carregar o ranking')
            return false

        }

        return ranking

    }

    function createUsersInRanking(ranking) {
        let rankingData = [];
        for (let i = 0; i < ranking.length; i++) {

            const user = new Ranking(ranking[i])

            insertPositionUsers(user)

            rankingData.push(user)
        }

        return rankingData
    }

    function insertPositionUsers(user) {

        const container = document.querySelector('.users-ranking')

        const div = document.createElement('div')

        div.setAttribute('class', 'position-users')
        div.setAttribute('position', user.position)

        const classBox = ["box-position", "box-name", "box-points"]
        const valueBox = [`${user.position}º`, user.name, `${user.points} pts`]

        for (let i = 0; i < 3; i++) {

            const infos = insertBoxs(classBox, valueBox, i)

            div.appendChild(infos)

        }

        container.appendChild(div)
        limitedCharacters()
    }

    function insertBoxs(nameClass, valueBox, index) {

        const div = document.createElement('div')

        div.setAttribute('class', nameClass[index])
        div.setAttribute('title', 'Visualizar Perfil')

        div.innerHTML = valueBox[index]

        return div
    }

    function limitedCharacters() {
        const div = document.querySelectorAll('.box-name')
        const maxLenght = 28

        for (let i = 0; i < div.length; i++) {

            div[i].textContent = div[i].textContent.slice(0, maxLenght)

        }
    }

    function clickOfUsers(ranking, userExist = null) {

        const positionsElements = document.querySelectorAll('.position-users')

        positionsElements.forEach((element) => {

            element.addEventListener('click', () => {

                const position = element.getAttribute('position')
                const posInt = parseInt(position)

                if (posInt != userExist) {

                    getInfosFromUserToSeeProfile(ranking, posInt)

                }
            })
        })
    }

    function verifyModeRequest(ranking, position) {

        let userId

        if (mode != null) {

            for (let i = 0; i < ranking.length; i++) {

                if (ranking[i].position == position) {

                    userId = ranking[i].userId
                    break
                }
            }
        } else {

            userId = ranking[position - 1].userId

        }

        return userId
    }

    async function getInfosFromUserToSeeProfile(ranking, position) {

        const userId = verifyModeRequest(ranking, position)

        const data = {

            userId: userId

        }

        const token = localStorage.getItem('token')

        const response = await addTaskBack(apiViewProfile, data, token)

        if (!response.ok) {

            console.log('ocorreu um erro')
            return false

        }

        viewOtherProfile(response.responseData.user)

    }
}

async function searchUsers() {

    const inputUser = document.querySelector('#input-name-search')
    const inputUserValue = document.querySelector('#input-name-search').value
    const lenghtInput = inputUserValue.trim()

    if (inputUserValue === "" || inputUserValue === null || lenghtInput === "") {

        inputUser.setAttribute('class', 'watch-out')

        inputUser.addEventListener('click', () => {
            inputUser.removeAttribute('class', 'watch-out')
        })

        return false
    }

    const token = localStorage.getItem('token')

    const data = {
        search: inputUserValue
    }

    const response = await addTaskBack(apiSearch, data, token)

    console.log(response)

    if (response.status == 404) {

        console.log(response.responseData.msg)
        return false

    }

    if (!response.ok) {

        console.log('Algum erro inesperado ocorreu')
        return false
    }

    const ranking = response.responseData.users
    const exist = response.responseData.exist

    removePosition()

    interactorRanking(ranking, exist)
}

function recall() {

    removePosition()

    const input = document.querySelector('#input-name-search')

    input.value = ""

    const btnRecall = document.querySelector('#refresh')
    const btnSearch = document.querySelector('#search')

    btnRecall.removeEventListener('click', recall)
    btnSearch.removeEventListener('click', searchUsers)

    interactorRanking()
}

function removePosition() {

    const users = document.querySelectorAll('.position-users')

    for (let i = 0; i < users.length; i++) {

        users[i].remove()

    }

}