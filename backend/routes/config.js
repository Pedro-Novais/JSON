const router = require('express').Router()

const configController = require('../controllers/configController')

router
    .route('/user/:userId/config')
    .get((req, res) => configController.getAll(req, res))

router
    .route('/user/:userId/config')
    .put((req, res) => configController.update(req, res))


module.exports = router;