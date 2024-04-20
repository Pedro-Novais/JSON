const mongoose = require('mongoose')
require('dotenv').config()

async function main(){
    try{
        mongoose.set('strictQuery', true)

        await mongoose.connect(
            process.env.CONEXION
            )

        console.log('Conectado ao Banco')
    }catch(err){
        console.log(`Erro: ${err}`)
    }
}

module.exports = main