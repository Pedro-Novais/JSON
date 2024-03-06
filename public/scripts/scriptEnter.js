import { get, post } from "./utils/functionsReq.js"
import { validEmail } from "./utils/utilsInitial.js"

const urlLogin = "/api/login"
const urlList = "/list-to-do"

export async function interactorLogin() {
    const email = document.querySelector('#value-email')
    const password = document.querySelector('#value-password')

    const btnSend = document.querySelector('#btn-login')

    btnSend.addEventListener('click', makeLogin)

    removePlaceholder()

    async function makeLogin() {

        /*if (email.value == "" || password.value == "") {

            email.value = "pedro2@gmail.com"
            password.value = "pedro2"
        }*/

        if (email.value == "" || password.value == "") {
            return console.log('Preencha todos os dados para realizar o login')
        }

        if (!validEmail(email.value)) {
            return console.log('Formato de email inválido')
        }


        const data = {
            email: email.value,
            password: password.value
        }

        const loginResult = await post(urlLogin, data)

        if (loginResult.ok) {

            const responseToDo = await get(urlList, loginResult.responseData.token)

            localStorage.setItem('token', loginResult.responseData.token);

            window.location.href = responseToDo.url
        } else {

            console.log(loginResult)
        }

    }

    function removePlaceholder() {
        const inputAuthor = document.querySelectorAll('.inputs-credentials');
        let placeholder = []

        for (let i = 0; i < inputAuthor.length; i++) {

            placeholder[i] = inputAuthor[i].placeholder;

        }

        inputAuthor.forEach((input) => {

            input.addEventListener('focus', () => {
                input.placeholder = ""
            })
        })

        inputAuthor.forEach((input) => {

            input.addEventListener('blur', () => {

                if (input.value == "") {

                    const getForName = input.getAttribute('mark')
                    inputAuthor[getForName].placeholder = placeholder[getForName]
                }
            })
        })
    }
}