const router = require('express').Router()

const taskController = require('../controllers/taskController')

router
    .route('/user/:id/tasks')
    .post((req, res) => taskController.create(req, res))

router
    .route('/user/:userId/tasks')
    .get((req, res) => taskController.getAll(req, res))

router
    .route('/user/:userId/tasks/:taskId') 
    .delete((req, res) => taskController.delete(req, res))

router
    .route('/user/:userId/tasks/:taskId')
    .put((req, res) => taskController.update(req, res))


module.exports = router;