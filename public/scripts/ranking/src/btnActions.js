import { BuilderPositions } from "./builderPositions.js"
import { InteractorRanking } from "../interactor.js"

export class ButtonsActionsRanking {

    constructor() {

        this.adding_event()
    }

    adding_event() {

        const btn_recall = document.querySelector('#refresh')

        btn_recall.addEventListener('click', this.recall_ranking)
    }

    view_profile(){

    }

    recall_ranking() {

        const btn_recall = document.querySelector('#refresh')

        btn_recall.removeEventListener('click', this.recall_ranking)

        const position_element = document.querySelectorAll('.position-users')

        position_element.forEach(element => {

            element.remove()

        })

        new InteractorRanking()

    }
}