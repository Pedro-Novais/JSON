import { validEmail } from "./utils/validEmail.js"

export async function interectorRegister(){
    
    const name = document.querySelector('#value-name')
    const email = document.querySelector('#value-email')
    const password = document.querySelector('#value-password')

    const btnRegister = document.querySelector('#btn-register')

    btnRegister.addEventListener('click', register)

    async function register(){
        
        if (email.value == "" || password.value == "" || name.value == "") {
            return console.log('Preencha todos os dados para realizar o cadastro')
        }

        if (!validEmail(email.value)) {
            return console.log('Formato de email inválido')
        }

        const passwordSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password.value)
        const passwordNumber = /\d/.test(password.value);

        if(password.value.length < 7){
            return console.log('Digite uma senha mais longa')
        }

        if (!passwordSymbol || !passwordNumber){
            return console.log('Sua senha precisa conter simbolos e números')
        }

        const data = {
            name: name.value,
            email: email.value,
            password: password.value
        }
    }
}