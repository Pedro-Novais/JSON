import { validEmail, boxAlerts, validOnlyNumber, removePlaceholder } from "./utils/utilsInitial.js"
import { register, digitCode } from "./utils/modals.js"
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

    btnRegister.addEventListener('click', registerFun)

    async function registerFun() {

        name.value = "Teste"
        email.value = "teste@gmail.com"
        password.value = "teste123$"

        if (email.value == "" || password.value == "" || name.value == "") {

            return boxAlerts("Preencha todos os dados para realizar o cadastro", '#container-register', 5000)

        }

        if (!validEmail(email.value)) {

            return boxAlerts("Insira um formato de email válido", '#container-register', 5000)
        }

        const passwordSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password.value)
        const passwordNumber = /\d/.test(password.value);

        if (password.value.length < 7) {

            return boxAlerts("Sua senha precisa conter mais de 7 caracteres", '#container-register', 5000)
        }

        if (!passwordSymbol || !passwordNumber) {

            return boxAlerts("Sua senha precisa conter números e símbolos", '#container-register', 5000)
        }

        const data = {
            email: email.value,
        }
        const response = await post(apiCreateCode, data)

        if (response.status !== 201) {

            return boxAlerts(response.responseData.msg, '#container-register', 5000)

        } else {

            containerRegister.remove()
            header.style.pointerEvents = 'none';

            div.setAttribute('class', 'conatiner-credentials')
            div.setAttribute('id', 'container-insert-code')

            div.innerHTML = digitCode

            main.appendChild(div)

            boxAlerts(`O código de confirmação foi enviado ao seu email: ${data.email}`, '#container-insert-code', 100000)
            verificationCode(data)
        }
    }

    async function verificationCode() {

        const inputCode = document.querySelector('#value-code')
        const btnSend = document.querySelector('#btn-verify-code')
        const sendAgain = document.querySelector('#re-send-code')
        const backPage = document.querySelector('#back-page')

        btnSend.addEventListener('click', async () => {

            if (inputCode.value == "") {
                return boxAlerts("É necessário inserir o código de confirmação para continuar", '#container-insert-code', 5000)

            }

            if (!validOnlyNumber(inputCode.value)) {
                return boxAlerts("O código não está no formato válido, verifique seu email e tente novamente", '#container-insert-code', 5000)
            }

            const data = {
                email: email.value,
                code: inputCode.value
            }

            const response = await post(apiVerifyCode, data)

            if (!response.ok) {

                return boxAlerts("O código inserido está incorreto, verifique seu email e tente novamente", '#container-insert-code', 5000)

            } else {

                const data = {
                    name: name.value,
                    email: email.value,
                    password: password.value
                }

                const response = await post(apiRegister, data)

                if (response.ok) {

                    const responseToDo = await get(urlList, response.responseData.token)

                    boxAlerts("Conta criada com sucesso", '#container-insert-code', 5000)

                    localStorage.setItem('token', response.responseData.token);

                    setTimeout(() => {
                        window.location.href = responseToDo.url
                    }, 1000)

                } else {
                    console.log("Algum erro inesperado aconteceu")
                }

            }

        })

        sendAgain.addEventListener("click", async () => {

            try {

                const data = {
                    email: email.value,
                }

                const response = await post(apiCreateCode, data)

                if (response.ok) {

                    boxAlerts(`Um novo código foi enviado ao email: ${data.email}`, '#container-insert-code', 5000)

                } else {
                    boxAlerts("Ocorreu um erro ao criar um novo código, tente novamente mais tarde", '#container-insert-code', 5000)
                }

            } catch (error) {
                console.log(error)
            }

        })

        backPage.addEventListener('click', () => {
            console.log(email.value, name.value)
            div.remove()

            header.style.pointerEvents = 'unset';

            div.setAttribute('class', 'conatiner-credentials')
            div.setAttribute('id', 'container-register')

            div.innerHTML = register

            main.appendChild(div)

            const nameElement = document.querySelector('#value-name')
            const emailElement = document.querySelector('#value-email')
            const passwordElement = document.querySelector('#value-password')

            nameElement.value = name.value
            emailElement.value = email.value
            
            interectorRegister()
        })
    }

    removePlaceholder()
}