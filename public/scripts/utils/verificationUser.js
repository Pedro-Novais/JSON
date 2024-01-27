import { getUser } from "./functionsReq.js"

export async function verifyUser(){

    const getInfoUser = "/api/user"

    const token = localStorage.getItem('token')

    const responseInfoUser = await getUser(getInfoUser, token)

    return  responseInfoUser

}