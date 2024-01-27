import { getUser } from "./functionsReq.js"

export async function verifyUser(){

    const getInfoUser = "/api/user"

    const idUser = localStorage.getItem('id') 
    const token = localStorage.getItem('token')

    const responseInfoUser = await getUser(getInfoUser, idUser, token)

    return  responseInfoUser

}