const router = require('express').Router()
const path = require('path');

const loginController = require('../controllers/loginController')

router
    .route('/login')
    .post((req, res) => loginController.login(req, res))

module.exports = router;