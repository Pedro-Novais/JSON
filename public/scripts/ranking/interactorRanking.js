import { verifyUser } from "../utils/verificationUser.js"
import { mark_header } from "../utils/markHeader.js"
import { BuilderPositions } from "./src/builderPositions.js"
import { ButtonsActionsRanking } from "./src/btnActions.js"

export class InteractorRanking {

    constructor() {

        mark_header('ranking')
        new BuilderPositions()
        new ButtonsActionsRanking()
    }
}

new InteractorRanking()