const router = require('express').Router()
const {checkToken} = require('../controllers/utils/checkToken')

const configController = require('../controllers/configController')

router
    .route('/user/config')
    .get(checkToken, (req, res) => configController.getAll(req, res))

router
    .route('/user/config')
    .put(checkToken, (req, res) => configController.update(req, res))


module.exports = router;