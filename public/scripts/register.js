import { validEmail } from "./utils/validEmail.js"
import { digitCode } from "./utils/modals.js"
import { get, post } from "./utils/functionsReq.js"

const urlList = "/list-to-do"
const apiCreateCode = "/api/confirmation"
const apiVerifyCode = "/api/verify"
const apiRegister = "/api/register"

export async function interectorRegister() {

    const containerRegister = document.querySelector('#container-register')

    const header = document.querySelector('header')
    const main = document.querySelector('main')
    const div = document.createElement('div')

    const name = document.querySelector('#value-name')
    const email = document.querySelector('#value-email')
    const password = document.querySelector('#value-password')

    const btnRegister = document.querySelector('#btn-register')

    btnRegister.addEventListener('click', register)

    async function register() {

        name.value = "Teste"
        //email.value = "predohn@gmail.com"
        password.value = "teste123$"

        if (email.value == "" || password.value == "" || name.value == "") {
            return console.log('Preencha todos os dados para realizar o cadastro')
        }

        if (!validEmail(email.value)) {
            return console.log('Formato de email inválido')
        }

        const passwordSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password.value)
        const passwordNumber = /\d/.test(password.value);

        if (password.value.length < 7) {
            return console.log('Digite uma senha mais longa')
        }

        if (!passwordSymbol || !passwordNumber) {
            return console.log('Sua senha precisa conter simbolos e números')
        }

        const data = {
            email: email.value,
        }
        const response = await post(apiCreateCode, data)

        if (response.status !== 201) {

            console.log(response.responseData.msg)

        } else {

            console.log(response)
            containerRegister.style.display = "none"
            header.style.pointerEvents = 'none';

            div.setAttribute('class', 'conatiner-credentials')
            div.setAttribute('id', 'container-insert-code')

            div.innerHTML = digitCode

            main.appendChild(div)

            verificationCode(data)
        }
    }

    async function verificationCode() {

        const inputCode = document.querySelector('#value-code')
        const btnSend = document.querySelector('#btn-verify-code')

        btnSend.addEventListener('click', async () => {

            if(inputCode.value == " "){

                return false

            }

            const data = {
                email: email.value,
                code: inputCode.value
            }

            const response = await post(apiVerifyCode, data)
            console.log(response)

            if (!response.ok) {

                return console.log('CÓDIGO INVALIDO')

            }else {

                const data = {
                    name: name.value,
                    email: email.value,
                    password: password.value
                }

                const response = await post(apiRegister, data)

                if (response.ok) {

                    const responseToDo = await get(urlList, response.responseData.token)

                    localStorage.setItem('token', response.responseData.token);

                    window.location.href = responseToDo.url

                } else {
                    console.log("Algum erro inesperado aconteceu")
                }

            }

        })
    }
}