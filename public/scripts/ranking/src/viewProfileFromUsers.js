import { MODAL } from "./utils/modal.js";

export class ViewProfileFromUser{

    constructor(user){

        const main = document.querySelector('main')

        console.log(user)
        main.innerHTML = MODAL.profile
    }
}