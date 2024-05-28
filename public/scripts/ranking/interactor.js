import { verifyUser } from "../utils/verificationUser.js"
import { mark_header } from "../utils/markHeader.js"
import { BuilderPositions } from "./src/builderPositions.js"
import { ButtonsActionsRanking } from "./src/btnActions.js"

export class InteractorRanking {

    constructor(positions = null) {
        mark_header('ranking')
        new BuilderPositions(positions)
        new ButtonsActionsRanking()
    }
}