const express = require('express')
const path = require('path');
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

// Configurar o middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// DB Conection
const conn = require('./backend/db/conn')

conn()

// Routes
const routes = require ('./backend/routes/router')

app.use('/api', routes)

app.use(express.json())

app.listen(3000, '0.0.0.0', ()=>{
    console.log('App Running...')
})