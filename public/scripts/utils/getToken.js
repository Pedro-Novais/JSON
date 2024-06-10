import { API } from "./endPoints.js"

export function get_token(type_initial = null){

    const token = localStorage.getItem('token')
    
    if(type_initial == null){

        if(token == null || token == "" || token == " "){
    
            window.location.href = API.url_welcome
            return false
    
        }

    }

    return token
    
}