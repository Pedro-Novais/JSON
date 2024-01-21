const mongoose = require('mongoose')

async function main(){
    try{
        mongoose.set('strictQuery', true)

        await mongoose.connect(
            "mongodb+srv://phnovais7:A6oRezjahsWtMSBD@cluster0.oyxlugg.mongodb.net/?retryWrites=true&w=majority"
            )

        console.log('Conectado ao Banco')
    }catch(err){
        console.log(`Erro: ${err}`)
    }
}

module.exports = main