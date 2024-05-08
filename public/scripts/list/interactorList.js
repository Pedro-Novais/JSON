import { verifyUser } from "../utils/verificationUser.js"
import { get } from "../utils/functionsReq.js"

const api = 'api/user/tasks'
export class InteractorList{

    constructor(url){

        this.get_data(url)
    
    }

    async get_data(url){

        const token = localStorage.getItem('token')
        const response = await get(api, token, 1)

        console.log(response)
        window.location.href = url

    }
}