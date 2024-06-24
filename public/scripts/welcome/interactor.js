import { mark_header } from "../utils/markHeader.js"

export class InteractorWelcome{

    constructor(){
        mark_header('welcome')
        this.make_carrousel()
    }

    make_carrousel(){

        const img = document.querySelector('#image')

        img.setAttribute('src', './img/tasks.png')

        const images = ['statistic', 'ranking', 'tasks']
        let cont = 0

        setInterval(() => {
            
            if(cont >= images.length){
                cont = 0
            }

            img.setAttribute('src', `./img/${images[cont]}.png`)

            cont++
            
        },5000)
    }

}