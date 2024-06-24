const router = require('express').Router()
const path = require('path');

const loginController = require('../controllers/loginController')

router
    .route('/login')
    .post((req, res) => loginController.login(req, res))

router
    .route('/recall-code')
    .post((req, res) => loginController.recallCode(req, res))

router
    .route('/recall-pass')
    .post((req, res) => loginController.verifyChangePassword(req, res))

module.exports = router;