const router = require('express').Router()
const {checkToken} = require('../controllers/utils/checkToken')

const taskController = require('../controllers/taskController')

router
    .route('/user/tasks')
    .post(checkToken, (req, res) => taskController.create(req, res))

router
    .route('/user/tasks')
    .get(checkToken, (req, res) => taskController.getAll(req, res))

router
    .route('/user/tasks/:taskId') 
    .delete(checkToken, (req, res) => taskController.delete(req, res))

router
    .route('/user/tasks/:taskId')
    .put(checkToken, (req, res) => taskController.update(req, res))


module.exports = router;