const router = require('express').Router()

const statisticController = require('../controllers/statisticController')

router
    .route('/user/:userId/statistic')
    .get((req, res) => statisticController.get(req, res))

router
    .route('/user/:userId/statistic')
    .put((req, res) => statisticController.update(req, res))

module.exports = router