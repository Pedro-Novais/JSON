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
  
    const rankingFormated = createUsersInRanking(ranking)

    clickOfUsers(rankingFormated)

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
        let rankingData = [];
        for(let i = 0; i < ranking.length; i++){

            const user = new Ranking(ranking[i])
 
            insertPositionUsers(user)

            rankingData.push(user)
        }
     
        return rankingData
    }

    function insertPositionUsers(user){

        const container = document.querySelector('.users-ranking')

        const div = document.createElement('div')

        div.setAttribute('class', 'position-users')
        div.setAttribute('position', user.position)

        const classBox = ["box-position", "box-name", "box-points"]
        const valueBox = [`${user.position}º`, user.name, `${user.points} pts`]

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
        div.setAttribute('title', 'Visualizar Perfil')

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

    function clickOfUsers(ranking){
        
        const positionsElements = document.querySelectorAll('.position-users')

        positionsElements.forEach((element) => {

            element.addEventListener('click', () => {

                const position = element.getAttribute('position')
                const posInt = parseInt(position)
              
                getInfosFromUserToSeeProfile(ranking, posInt)

            })

        })
    }

    async function getInfosFromUserToSeeProfile(ranking, position){

        console.log(ranking[position-1])
        console.log(position)
    }
}