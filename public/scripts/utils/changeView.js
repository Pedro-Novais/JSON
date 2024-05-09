import { get } from "../utils/functionsReq.js";
import { get_token } from "../utils/getToken.js";

export async function change_view(endpoint){

    const token = get_token()
    const response = await get(endpoint, token, 2)
 
    if(!response.ok){

        console.log('Algum erro ocorreu!')
        return false
    }

    window.location.href = response.response.url
}