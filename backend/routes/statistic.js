const router = require('express').Router()
const {checkToken} = require('../controllers/utils/checkToken')

const statisticController = require('../controllers/statisticController')

router
    .route('/user/statistic')
    .get(checkToken, (req, res) => statisticController.get(req, res))

router
    .route('/user/statistic/:priority')
    .put(checkToken, (req, res) => statisticController.update(req, res))

module.exports = router