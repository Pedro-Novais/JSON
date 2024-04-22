const router = require('express').Router()
const {checkToken} = require('../controllers/utils/checkToken')

const {rankingController} = require('../controllers/rankingController')

router
    .route('/ranking')
    .get(checkToken, (req, res) => rankingController.get(req, res))

module.exports = router