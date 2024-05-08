import { getUser } from "./functionsReq.js"

async function verifyUser(){

    const getInfoUser = "/api/user"

    const token = localStorage.getItem('token')

    const responseInfoUser = await getUser(getInfoUser, token)

    return  responseInfoUser

}

async function verify_get_info_user(){

    const getInfoUser = "/api/user"

    const token = localStorage.getItem('token')

    const responseInfoUser = await getUser(getInfoUser, token)

    return  responseInfoUser

}

export {verifyUser, verify_get_info_user}