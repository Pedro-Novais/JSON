import { PopUpGlobal } from "../utils/popup_global.js";

export class SignOut{

    constructor(){
        this.popup()
    }

    popup(){

        const main = document.querySelector('main')
        const child_main = main.firstElementChild
        const identifier = child_main.getAttribute('id')
        
        new PopUpGlobal(`#${identifier}`, 'Atenção!', 'Deseja encerrar sua sessão?', null, null, true)
    }
}