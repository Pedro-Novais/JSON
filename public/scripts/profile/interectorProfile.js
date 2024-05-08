import { verifyUser } from "../utils/verificationUser.js"

export class InteractorProfile{

    constructor(url){
        this.get_data(url)
    }

    async get_data(url){

        const response = await verifyUser()

        window.location.href = url
    }
}