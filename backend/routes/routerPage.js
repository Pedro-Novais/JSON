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

router
    .route('/list')
    .get((req, res) => pageController.pageList(req, res))

router
    .route('/profile/user')
    .get((req, res) => pageController.pageProfile(req, res))

router
    .route('/profile/statistic')
    .get((req, res) => pageController.pageStatistic(req, res))

router
    .route('/profile/configurations')
    .get((req, res) => pageController.pageConfig(req, res))

router
    .route('/ranking')
    .get((req, res) => pageController.pageRanking(req, res))

router
    .route('/sign-out')
    .get((req, res) => pageController.pageOut(req, res))

module.exports = router 