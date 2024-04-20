export async function interactorRanking(){

    limitedCharacters()
    console.log('chegou')
    function limitedCharacters(){
        const div = document.querySelectorAll('.box-name')
        const maxLenght = 28
        
        for(let i = 0; i < div.length; i++){
    
            div[i].textContent = div[i].textContent.slice(0, maxLenght)
    
        }
    }
}