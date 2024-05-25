import { verifyUser } from "../utils/verificationUser.js"
import { mark_header } from "../utils/markHeader.js"
import { BuilderPositions } from "./src/builderPositions.js"

class InteractorRanking {

    constructor() {

        mark_header('ranking')
        new BuilderPositions()

    }
}

new InteractorRanking()