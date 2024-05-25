import { get_json } from '../../utils/functionsReq.js'
import {get_token } from '../../utils/getToken.js'
import { API } from '../../utils/endPoints.js'

export class BuilderPositions {

    constructor() {

        this.get_data()

    }

    async get_data() {

        const token = get_token()

        const response = await get_json(API.url_ranking, token)

        console.log(response)
    }
}