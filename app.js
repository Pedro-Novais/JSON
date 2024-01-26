const express = require('express')
const path = require('path');
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));

// Configuração do mecanismo de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// DB Conection
const conn = require('./backend/db/conn')

conn()

// Routes
const routes = require ('./backend/routes/router')
const routesPage = require('./backend/routes/routerPage')

app.use('/', routesPage)
app.use('/api', routes)

app.use(express.json())

app.listen(3000, '0.0.0.0', ()=>{
    console.log('App Running...')
})