const router = require('express').Router()

const registerController = require('../controllers/registerController')

router
    .route('/register')
    .post((req, res) => registerController.create(req, res))

module.exports = router;