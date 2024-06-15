const router = require('express').Router()
const {checkToken} = require('../controllers/utils/checkToken')

const pageController = require('../controllers/pageController')

router
    .route('/')
    .get((req, res) => pageController.pageWelcome(req, res))

router
    .route('/login')
    .get((req, res) => pageController.pageLogin(req, res))

router
    .route('/register')
    .get((req, res) => pageController.pageRegister(req, res))

router
    .route('/welcome')
    .get((req, res) => pageController.pageWelcome(req, res))

router
    .route('/list-to-do')
    .get((req, res) => pageController.pageIndex(req, res))

router
    .route('/list')
    .get((req, res) => pageController.pageList(req, res))

router
    .route('/profile')
    .get((req, res) => pageController.pageProfile(req, res))

router
    .route('/personalizations')
    .get((req, res) => pageController.pagePersonalization(req, res))

router
    .route('/statistic')
    .get((req, res) => pageController.pageStatistic(req, res))

router
    .route('/configurations')
    .get((req, res) => pageController.pageConfig(req, res))

router
    .route('/ranking')
    .get((req, res) => pageController.pageRanking(req, res))

router
    .route('/sign-out')
    .get((req, res) => pageController.pageOut(req, res))

module.exports = router 