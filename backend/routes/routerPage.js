const router = require('express').Router()

router
    .route('/login')
    .get((req, res) =>{
        res.render('initial')
    })

router
    .route('/')
    .get((req, res) =>{
        res.render('index')
    })

module.exports = router