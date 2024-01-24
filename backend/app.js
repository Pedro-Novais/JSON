const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

// DB Conection
const conn = require('./db/conn')

conn()

// Routes
const routes = require ('./routes/router')

app.use('/api', routes)

app.use(express.json())

app.listen(3000, '0.0.0.0', ()=>{
    console.log('App Running...')
})