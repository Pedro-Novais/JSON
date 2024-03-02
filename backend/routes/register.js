const router = require('express').Router()

const registerController = require('../controllers/registerController')

router
    .route('/register')
    .post((req, res) => registerController.create(req, res))

router 
    .route('/confirmation')
    .post((req, res) => registerController.createCode(req, res))

router
    .route('/verify')
    .post((req, res) => registerController.verifyCode(req, res))

module.exports = router;