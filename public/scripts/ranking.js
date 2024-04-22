import { get } from "./utils/functionsReq.js"

const apiRanking = "/api/ranking"
export async function interactorRanking(){

    class Ranking{

        constructor(user){
            this.userId = user._id
            this.name = user.nameUser
            this.position = user.position
            this.points = user.tasksFinished
        }

    }

    const response = await getRanking()

    const ranking = response.responseData
  
    createUsersInRanking(ranking)

    async function getRanking(){

        const token = localStorage.getItem('token')
        const ranking = await get(apiRanking, token)

        if(!ranking.ok){

            console.log('ocorreu um erro ao carregar o ranking')
            return false

        }
        
        return ranking

    }

    function createUsersInRanking(ranking){

        for(let i = 0; i < ranking.length; i++){

            const user = new Ranking(ranking[i])

            insertPositionUsers(user)
        }
    }

    function insertPositionUsers(user){

        const container = document.querySelector('.users-ranking')

        const div = document.createElement('div')

        div.setAttribute('class', 'position-users')
        div.setAttribute('position', user.position)

        const classBox = ["box-position", "box-name", "box-points"]
        const valueBox = [user.position, user.name, user.points]

        for(let i = 0; i < 3; i++){

            const infos = insertBoxs(classBox, valueBox, i)

            div.appendChild(infos)

        }

        container.appendChild(div)
        limitedCharacters()
    }

    function insertBoxs(nameClass, valueBox, index){

        const div = document.createElement('div')

        div.setAttribute('class', nameClass[index])

        div.innerHTML = valueBox[index]

        return div
    }

    function limitedCharacters(){
        const div = document.querySelectorAll('.box-name')
        const maxLenght = 28
        
        for(let i = 0; i < div.length; i++){
    
            div[i].textContent = div[i].textContent.slice(0, maxLenght)
    
        }
    }
}