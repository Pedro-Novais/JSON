const router = require('express').Router()
const {checkToken} = require('../controllers/utils/checkToken')

const pageController = require('../controllers/pageController')

router
    .route('/')
    .get((req, res) => pageController.verification(req, res))

router
    .route('/login')
    .get((req, res) => pageController.pageLogin(req, res))

router
    .route('/list-to-do')
    .get((req, res) => pageController.pageIndex(req, res))

module.exports = router 